import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilmCardResponse } from '../Dto/Film/FilmCardResponse';
import { FilmService } from '../_services/film.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent {
  @Input() film: FilmCardResponse | undefined;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor(private filmService: FilmService) { }

  get genres(): string {
    if (this.film)
      return this.film.genreNames.join("|");
    return "";
  }

  deleteFilm() {
    if (this.film) {
      this.filmService.deleteFilm(this.film.id).subscribe();
      this.onDelete.emit(this.film.id);
    }

  }
}
