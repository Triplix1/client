import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../Constants/Constants';
import { FilterParams } from '../_helpers/filterParams';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private localFilmsUrl = "films/";
  private localGenreUrl = "genres/";

  constructor(private http: HttpClient) { }

  getYersList() {
    return this.http.get<number[]>(Constants.baseApiUrl + this.localFilmsUrl + "years");
  }

  getGenresList() {
    return this.http.get<string[]>(Constants.baseApiUrl + this.localGenreUrl + "names");
  }

  includeFilterHeaders(filterParams: FilterParams, params: HttpParams) {
    if (filterParams.year)
      params = params.append('year', filterParams.year);

    if (filterParams.genre)
      params = params.append('genre', filterParams.genre);

    if (filterParams.expected != null)
      params = params.append('expected', filterParams.expected);

    if (filterParams.orderBy != null) {
      params.append('orderBy', filterParams.orderBy.orderBy);
      params.append('asc', filterParams.orderBy.asc);
    }

    return params;
  }
}
