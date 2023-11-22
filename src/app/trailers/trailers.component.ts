import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TrailerResponse } from '../Dto/Film/trailerResponse';
import { FilmService } from '../_services/film.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.scss'],
})
export class TrailersComponent {
  trailers: TrailerResponse[] | undefined;

  constructor(private filmService: FilmService,
    public sanitizer: DomSanitizer) {
    this.filmService.getTrailers().subscribe(
      response => this.trailers = response
    );
  }

}
