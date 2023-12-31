import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreParams } from '../helpers/genreParams';
import { GenreResponse } from '../../Models/Genre/genreResponse';
import { PaginationService } from './pagination.service';
import { GenreUpdateRequest } from '../../Models/Genre/genreUpdateRequest';
import { GenreAddRequest } from '../../Models/Genre/genreAddRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  localUrl = 'genres/'

  constructor(private httpClient: HttpClient, private paginationService: PaginationService) { }

  getGenreNamesList() {
    return this.httpClient.get<string[]>(environment.baseApiUrl + this.localUrl + "names");
  }

  getGenres(genreParams: GenreParams) {
    const params = this.getGenreHeaders(genreParams);
    return this.paginationService.getPaginatedResult<GenreResponse[]>(environment.baseApiUrl + this.localUrl, params, this.httpClient);
  }

  private getGenreHeaders(genreParams: GenreParams) {
    let params = new HttpParams();
    params = this.paginationService.includePaginationHeaders(genreParams, params);
    return params;
  }

  createGenre(genreAddRequest: GenreAddRequest) {
    return this.httpClient.post<GenreResponse>(environment.baseApiUrl + this.localUrl + "create", genreAddRequest);
  }

  editGenre(genreUpdateRequest: GenreUpdateRequest) {
    return this.httpClient.put<GenreResponse>(environment.baseApiUrl + this.localUrl + "edit", genreUpdateRequest);
  }

  deleteGenre(genreId: string) {
    return this.httpClient.delete(environment.baseApiUrl + this.localUrl + "delete/" + genreId);
  }
}
