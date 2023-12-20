import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TrailerResponse } from '../../../Models/Film/trailerResponse';
import { FilmService } from '../../../Core/services/film.service';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs';

@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.scss'],
})
export class TrailersComponent {
  trailers: TrailerResponse[] | undefined;

  constructor(private filmService: FilmService,
    public sanitizer: DomSanitizer) {
    this.filmService.getTrailers().pipe(take(1)).subscribe(
      response => this.trailers = response
    );
  }

}
