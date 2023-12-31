import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrailerResponse } from '../../Models/Film/trailerResponse';
import { FilmCardResponse } from '../../Models/Film/FilmCardResponse';
import { FilmParams } from '../helpers/filmParams';
import { PaginationService } from './pagination.service';
import { FiltersService } from './filters.service';
import { FilmResponse } from '../../Models/Film/filmResponse';
import { FilmAddRequest } from '../../Models/Film/flimAddRequest';
import { objectToFormData } from '../helpers/formDataHelper';
import { FilmUpdateRequest } from '../../Models/Film/filmUpdateRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private localUrl = "films/";

  constructor(private http: HttpClient, private paginationService: PaginationService, private filterService: FiltersService) { }

  getTrailers() {
    return this.http.get<TrailerResponse[]>(environment.baseApiUrl + this.localUrl + "trailers/10");
  }

  getFilmCards(filmParams: FilmParams) {
    const params = this.getFilmHeaders(filmParams);

    return this.paginationService.getPaginatedResult<FilmCardResponse[]>(environment.baseApiUrl + this.localUrl, params, this.http);
  }

  getAllFilmCards(filmParams: FilmParams) {
    let params = this.getFilmHeaders(filmParams);
    if (filmParams.showHiddens != null)
      params = params.append('showHiddens', filmParams.showHiddens);

    return this.paginationService.getPaginatedResult<FilmCardResponse[]>(environment.baseApiUrl + this.localUrl + "all", params, this.http);
  }

  getFilm(filmId: string) {
    return this.http.get<FilmResponse>(environment.baseApiUrl + this.localUrl + filmId);
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
    return this.http.post<FilmResponse>(environment.baseApiUrl + this.localUrl + 'create', formData, options);
  }

  updateFilm(filmUpdateRequest: FilmUpdateRequest) {
    const formData = objectToFormData(filmUpdateRequest);
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    return this.http.put<FilmResponse>(environment.baseApiUrl + this.localUrl + 'edit', formData, options)
  }

  deleteFilm(id: string) {
    return this.http.delete(environment.baseApiUrl + this.localUrl + "delete/" + id);
  }
}
