import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrailerResponse } from '../../Models/Film/trailerResponse';
import { FilmCardResponse } from '../../Models/Film/FilmCardResponse';
import { FilmParams } from '../helpers/filmParams';
import { Constants } from '../constants/Constants';
import { PaginationService } from './pagination.service';
import { FiltersService } from './filters.service';
import { FilmResponse } from '../../Models/Film/filmResponse';
import { FilmAddRequest } from '../../Models/Film/flimAddRequest';
import { objectToFormData } from '../helpers/formDataHelper';
import { FilmUpdateRequest } from '../../Models/Film/filmUpdateRequest';

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

    // if (!filmParams.filterParams.genre)
    //   filmParams.filterParams.genre = null;

    // const headers = new HttpParams().set('filmParams', JSON.stringify(filmParams))

    // return this.paginationService.getPaginatedResult<FilmCardResponse[]>(Constants.baseApiUrl + this.localUrl, headers, this.http);

  }

  getAllFilmCards(filmParams: FilmParams) {
    let params = this.getFilmHeaders(filmParams);
    if (filmParams.showHiddens != null)
      params = params.append('showHiddens', filmParams.showHiddens);

    return this.paginationService.getPaginatedResult<FilmCardResponse[]>(Constants.baseApiUrl + this.localUrl + "all", params, this.http);
  }

  getFilm(filmId: string) {
    return this.http.get<FilmResponse>(Constants.baseApiUrl + this.localUrl + filmId);
  }

  private getFilmHeaders(filmParams: FilmParams): HttpParams {
    let params = new HttpParams();
    params = this.paginationService.includePaginationHeaders(filmParams, params);
    if (filmParams.filterParams)
      params = this.filterService.includeFilterHeaders(filmParams.filterParams, params);

    return params
  }

  createFilm(filmAddRequest: FilmAddRequest) {
    const formData = objectToFormData(filmAddRequest);
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    return this.http.post<FilmResponse>(Constants.baseApiUrl + this.localUrl + 'create', formData, options);
  }

  updateFilm(filmUpdateRequest: FilmUpdateRequest) {
    const formData = objectToFormData(filmUpdateRequest);
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    return this.http.put<FilmResponse>(Constants.baseApiUrl + this.localUrl + 'edit', formData, options)
  }

  deleteFilm(id: string) {
    return this.http.delete(Constants.baseApiUrl + this.localUrl + "delete/" + id);
  }
}
