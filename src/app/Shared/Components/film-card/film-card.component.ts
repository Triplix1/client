import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilmCardResponse } from '../../../Models/Film/FilmCardResponse';
import { FilmService } from '../../../Core/services/film.service';
import { AccountService } from 'src/app/Core/services/account.service';
import { take } from 'rxjs';
import { SubscriptionService } from 'src/app/Core/services/subscription.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {
  @Input() film: FilmCardResponse | undefined;
  @Input() mode: 'creating' | 'unsubscribing' = 'creating';
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onUnsubscribe: EventEmitter<string> = new EventEmitter<string>();
  defaultImage: string = '../../assets/photos/Marvel.jpeg';

  constructor(private filmService: FilmService, public acountService: AccountService, private subscriptionService: SubscriptionService) { }
  ngOnInit(): void {
    this.acountService
  }

  get genres(): string {
    if (this.film)
      return this.film.genreNames.slice(0, 2).join(" | ");
    return "";
  }

  deleteFilm() {
    if (this.film) {
      this.filmService.deleteFilm(this.film.id).pipe(take(1)).subscribe();
      this.onDelete.emit(this.film.id);
    }
  }

  unsubscribe() {
    if (this.film) {
      const filmId = this.film.id;
      this.subscriptionService.unsubscribe(filmId).pipe(take(1)).subscribe(
        _ => this.onUnsubscribe.emit(filmId)
      );

    }
  }
}
