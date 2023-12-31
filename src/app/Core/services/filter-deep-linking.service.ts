import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FilterParams } from '../helpers/filterParams';
import { OrderByParams } from '../helpers/orderByParams';

@Injectable({
  providedIn: 'root'
})
export class FilterDeepLinkingService {

  constructor(private route: ActivatedRoute, private router: Router) { }

  setFilterParams(filterParams: FilterParams): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.getFilterQueryParams(filterParams),
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  getFilterQueryParams(filterParams: FilterParams): Params {
    if (filterParams.orderByParams) {
      return {
        year: filterParams.year,
        genre: filterParams.genre,
        orderBy: filterParams.orderByParams?.orderBy,
        asc: filterParams.orderByParams?.asc,
        expected: filterParams.expected
      };
    }
    else {
      return {
        year: filterParams.year,
        genre: filterParams.genre,
        expected: filterParams.expected
      }
    }
  }

  getFilterParams(): FilterParams | null {
    // let year: string | null = null;
    // let genre: string | null = null;
    // let orderBy: string | null = null;
    // let asc: string | null = null;
    // let expected: string | null = null;

    // let queryString = window.location.search;
    // const queryParams = new URLSearchParams(queryString);
    // year = queryParams.get('year');
    // genre = queryParams.get('genre');
    // orderBy = queryParams.get('orderBy');
    // asc = queryParams.get('asc');
    // expected = queryParams.get('expected');

    let year: number | null = null;
    let genre: string | null = null;
    let orderBy: string | null = null;
    let asc: boolean | null = null;
    let expected: boolean | null = null;
    let search: string | null = null;

    this.route.queryParams.pipe()
      .subscribe(params => {
        year = params['year'] ? +params['year'] : null;
        genre = params['genre'];
        orderBy = params['orderBy'];
        asc = params['asc'] == null ? null : params['asc'] === "true";
        expected = params['expected'] == null ? null : params['expected'] === "true";
        search = params['search'];
      });

    let orderByParams: OrderByParams | null = null
    if (orderBy != null && asc != null) {
      orderByParams = new OrderByParams(orderBy, asc);
    }

    return new FilterParams(year == null ? null : +year, genre, orderByParams, expected ?? null, search);
  }
}
