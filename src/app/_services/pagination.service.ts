import { Injectable } from '@angular/core';
import { PaginatedParams } from '../_helpers/paginatedParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../_helpers/pagination';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  getPaginatedResult<T>(url: string, params: HttpParams, http: HttpClient) {
    let paginatedResult: PaginatedResult<T> = {};
    return http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult = response.body as PaginatedResult<T>;
        }
        return paginatedResult;
      })
    );
  }

  includePaginationHeaders(paginatedParams: PaginatedParams, params: HttpParams) {

    params = params.append('pageNumber', paginatedParams.pageNumber);
    params = params.append('pageSize', paginatedParams.pageSize);

    return params;
  }
}
