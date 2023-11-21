import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../Constants/Constants';
import { GenreParams } from '../_helpers/genreParams';
import { GenreResponse } from '../Dto/Genre/genreResponse';
import { PaginationService } from './pagination.service';
import { GenreUpdateRequest } from '../Dto/Genre/genreUpdateRequest';
import { GenreAddRequest } from '../Dto/Genre/genreAddRequest';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  localUrl = 'genres/'

  constructor(private httpClient: HttpClient, private paginationService: PaginationService) { }

  getGenreNamesList() {
    return this.httpClient.get<string[]>(Constants.baseApiUrl + this.localUrl + "names");
  }

  getGenres(genreParams: GenreParams) {
    const params = this.getGenreHeaders(genreParams);
    return this.paginationService.getPaginatedResult<GenreResponse[]>(Constants.baseApiUrl + this.localUrl, params, this.httpClient);
  }

  private getGenreHeaders(genreParams: GenreParams) {
    let params = new HttpParams();
    params = this.paginationService.includePaginationHeaders(genreParams, params);
    return params;
  }

  createGenre(genreAddRequest: GenreAddRequest) {
    return this.httpClient.post<GenreResponse>(Constants.baseApiUrl + this.localUrl + "create", genreAddRequest);
  }

  editGenre(genreUpdateRequest: GenreUpdateRequest) {
    return this.httpClient.put<GenreResponse>(Constants.baseApiUrl + this.localUrl + "edit", genreUpdateRequest);
  }

  deleteGenre(genreId: string) {
    return this.httpClient.delete(Constants.baseApiUrl + this.localUrl + "delete/" + genreId);
  }
}
