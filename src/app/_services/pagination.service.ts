import { Injectable } from '@angular/core';
import { PaginatedParams } from '../_helpers/paginatedParams';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  // getPaginatedResultPost<T>(url: string, body: any, http: HttpClient) {
  //   let paginatedResult: PaginatedResult<T> = {};
  //   return http.post<PaginatedResult<T>>(url, body).pipe(
  //     map(response => {
  //       if (response) {
  //         paginatedResult = response;
  //       }
  //       return paginatedResult;
  //     })
  //   );
  // }

  getPaginatedResultHeaders<T>(url: string, params: HttpHeaders, http: HttpClient) {
    let paginatedResult: PaginatedResult<T> = {};
    return http.get<T>(url, { headers: params, observe: 'response' }).pipe(
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
