import { Component, OnInit } from '@angular/core';
import { TrailerResponse } from '../Dto/Film/trailerResponse';
import { FilmService } from '../_services/film.service';

@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.scss']
})
export class TrailersComponent implements OnInit {
  trailers: TrailerResponse[] | undefined;

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.filmService.getTrailers().subscribe(
      response => this.trailers = response
    );
  }

}
