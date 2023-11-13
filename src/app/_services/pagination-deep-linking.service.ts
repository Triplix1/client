import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Route, Router, RouterEvent } from '@angular/router';
import { PaginatedParams } from '../_helpers/paginatedParams';
import { skip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationDeepLinkingService {

  constructor(private route: ActivatedRoute, private router: Router) { }

  setPaginatedParams(paginatedParams: PaginatedParams): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.getPaginationQueryParams(paginatedParams),
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  getPaginationQueryParams(paginatedParams: PaginatedParams): Params {
    return {
      pageSize: paginatedParams.pageSize as number,
      pageNumber: paginatedParams.pageNumber as number
    };
  }

  getPaginatedParams(): PaginatedParams | null {
    // let pageNumber: string | null = null;
    // let pageSize: string | null = null;

    // let queryString = window.location.search;
    // const queryParams = new URLSearchParams(queryString);
    // pageNumber = queryParams.get('pageNumber');
    // pageSize = queryParams.get('pageSize');

    let pageNumber: number | null = null;
    let pageSize: number | null = null;

    this.route.queryParams.pipe()
      .subscribe(params => {
        pageNumber = params['pageNumber'] ? +params['pageNumber'] : null;
        pageSize = params['pageSize'] ? +params['pageSize'] : null;
      });

    if (!pageNumber || !pageSize) {
      return null;
    }

    return new PaginatedParams(+pageSize, +pageNumber);
  }
}
