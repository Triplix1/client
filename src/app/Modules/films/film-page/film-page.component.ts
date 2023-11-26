import { Component, OnInit } from '@angular/core';
import { FilmResponse } from '../../../Models/Film/filmResponse';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { FilmPageDeepLinkingService } from '../../../Core/services/film-page-deep-linking.service';
import { FilmService } from '../../../Core/services/film.service';
import { delay, map } from 'rxjs';
import { NgOptimizedImage } from '@angular/common'
import { DomSanitizer } from '@angular/platform-browser';
import { RatingService } from '../../../Core/services/rating.service';
import { RatingResponse } from '../../../Models/Rating/RatingResponse';
import { AccountService } from '../../../Core/services/account.service';
import { User } from '../../../Models/User/user';
import { AuthorizationUseDeepLinkingService } from '../../../Core/services/authorization-use-deep-linking.service';
import { SubscriptionService } from '../../../Core/services/subscription.service';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit {
  film: FilmResponse | null = null;
  filmPageDeepLinkingService: FilmPageDeepLinkingService = new FilmPageDeepLinkingService(this.route, this.router);
  tab: number = 0;
  filmRate: number | undefined;
  currentUser: User | undefined;
  currentUserRate = 0;
  authorizationUseDeepLinkingService: AuthorizationUseDeepLinkingService = new AuthorizationUseDeepLinkingService(this.router, this.route, this.urlSerializer);
  isSubscribed: boolean = false;

  get filmGenres() {
    return this.film?.genreNames.join(", ");
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmService,
    public sanitizer: DomSanitizer,
    private ratingService: RatingService,
    private accountService: AccountService,
    private urlSerializer: UrlSerializer,
    private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    const filmId = this.filmPageDeepLinkingService.getFilmId();

    if (!filmId) return;

    this.filmService.getFilm(filmId)
      .subscribe((response) => {
        this.film = response;
        if (response.isExpected)
          this.subscriptionService.isSubscribed(response.id).subscribe(response => this.isSubscribed = response)
      });

    this.ratingService.getFilmRate(filmId).subscribe(
      respone => this.filmRate = respone
    );

    this.ratingService.getUserFilmRating(filmId).subscribe(
      userRate => this.currentUserRate = userRate.rate
    )

    this.accountService.currentUser$.subscribe(user => {
      if (user)
        this.currentUser = user;
    })
  }

  setCurrentRating(rate: number) {
    if (this.currentUser) {
      if (this.film) {
        this.ratingService.rateFilm({ rate: rate, filmId: this.film.id }).subscribe(respone => this.filmRate = respone.rate);
      }
    }
    else {
      this.authorizationUseDeepLinkingService.navigateToLogin();
    }
  }

  subscribe() {
    if (this.film) {
      if (!this.currentUser) {
        this.authorizationUseDeepLinkingService.navigateToLogin();
      }
      else
        this.subscriptionService.subscribe({ filmId: this.film.id }).subscribe(_ => this.isSubscribed = true);
    }
  }

  unsubscribe() {
    if (this.film) {
      this.subscriptionService.unsubscribe(this.film.id).subscribe(_ => this.isSubscribed = false);

    }
  }
}
