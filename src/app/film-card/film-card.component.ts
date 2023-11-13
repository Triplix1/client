import { Component, Input } from '@angular/core';
import { FilmCardResponse } from '../Dto/Film/FilmCardResponse';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent {
  @Input() film: FilmCardResponse | undefined;

  get genres(): string {
    if (this.film)
      return this.film.genreNames.join("|");
    return "";
  }
}
