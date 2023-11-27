import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilmCardResponse } from '../../../Models/Film/FilmCardResponse';
import { FilmService } from '../../../Core/services/film.service';
import { AccountService } from 'src/app/Core/services/account.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {
  @Input() film: FilmCardResponse | undefined;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  defaultImage: string = '../../assets/photos/Marvel.jpeg';

  constructor(private filmService: FilmService, public acountService: AccountService) { }
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
      this.filmService.deleteFilm(this.film.id).subscribe();
      this.onDelete.emit(this.film.id);
    }

  }
}
