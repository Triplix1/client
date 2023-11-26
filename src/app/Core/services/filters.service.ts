import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants/Constants';
import { FilterParams } from '../helpers/filterParams';
import { GenreService } from './genre.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private localFilmsUrl = "films/";

  constructor(private http: HttpClient, private genreService: GenreService) { }

  getYersList() {
    return this.http.get<number[]>(Constants.baseApiUrl + this.localFilmsUrl + "years");
  }

  getGenresList() {
    return this.genreService.getGenreNamesList();
  }

  includeFilterHeaders(filterParams: FilterParams, params: HttpParams) {
    if (filterParams.year)
      params = params.append('year', filterParams.year);

    if (filterParams.genre)
      params = params.append('genre', filterParams.genre);

    if (filterParams.expected != null)
      params = params.append('expected', filterParams.expected);

    if (filterParams.orderByParams != null) {
      params = params.append('orderBy', filterParams.orderByParams.orderBy);
      params = params.append('asc', filterParams.orderByParams.asc);
    }

    return params;
  }
}