import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrailerResponse } from '../Dto/Film/trailerResponse';
import { FilmCardResponse } from '../Dto/Film/FilmCardResponse';
import { FilmParams } from '../_helpers/filmParams';
import { Constants } from '../Constants/Constants';
import { PaginationService } from './pagination.service';
import { FiltersService } from './filters.service';
import { FilmResponse } from '../Dto/Film/filmResponse';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private localUrl = "films/";

  constructor(private http: HttpClient, private paginationService: PaginationService, private filterService: FiltersService) { }

  getTrailers() {
    return this.http.get<TrailerResponse[]>(Constants.baseApiUrl + this.localUrl + "trailers/10");
  }

  getFilmCards(filmParams: FilmParams) {
    const params = this.getFilmHeaders(filmParams);

    return this.paginationService.getPaginatedResult<FilmCardResponse[]>(Constants.baseApiUrl + this.localUrl, params, this.http);
  }

  getFilm(filmId: string) {
    return this.http.get<FilmResponse>(Constants.baseApiUrl + this.localUrl + filmId);
  }

  private getFilmHeaders(filmParams: FilmParams): HttpParams {
    let params = new HttpParams();
    params = this.paginationService.includePaginationHeaders(filmParams, params);
    if (filmParams.filterParams)
      params = this.filterService.includeFilterHeaders(filmParams.filterParams, params);
    return params;
  }
}
