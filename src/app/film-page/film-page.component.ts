import { Component, OnInit } from '@angular/core';
import { FilmResponse } from '../Dto/Film/filmResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmPageDeepLinkingService } from '../_services/film-page-deep-linking.service';
import { FilmService } from '../_services/film.service';
import { delay, map } from 'rxjs';
import { NgOptimizedImage } from '@angular/common'
import { DomSanitizer } from '@angular/platform-browser';
import { RatingService } from '../_services/rating.service';
import { RatingResponse } from '../Dto/Rating/RatingResponse';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.css']
})
export class FilmPageComponent implements OnInit {
  film: FilmResponse | null = null;
  filmPageDeepLinkingService: FilmPageDeepLinkingService = new FilmPageDeepLinkingService(this.route, this.router);
  tab: number = 0;
  filmRate: number | undefined;
  currentUser: User | undefined;
  currentUserRate = 0;

  get filmGenres() {
    return this.film?.genreNames.join(", ");
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmService,
    public sanitizer: DomSanitizer,
    private ratingService: RatingService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    const filmId = this.filmPageDeepLinkingService.getFilmId();

    if (!filmId) return;

    this.filmService.getFilm(filmId)
      .subscribe((response) =>
        this.film = response);

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
    if (this.film) {
      this.ratingService.rateFilm({ rate: rate, filmId: this.film.id }).subscribe(respone => this.filmRate = respone.rate);
    }
  }
}
