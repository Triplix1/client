import { Injectable } from '@angular/core';
import { FilterDeepLinkingService } from './filter-deep-linking.service';
import { PaginationDeepLinkingService } from './pagination-deep-linking.service';
import { FilmParams } from '../helpers/filmParams';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedParams } from '../helpers/paginatedParams';

@Injectable({
  providedIn: 'root'
})
export class FilmDeepLinkingService {
  private filterDeepLinkingService: FilterDeepLinkingService = new FilterDeepLinkingService(this.route, this.router);
  private paginationDeepLinkingService: PaginationDeepLinkingService = new PaginationDeepLinkingService(this.route, this.router);

  constructor(private route: ActivatedRoute, private router: Router) { }

  setFilmParams(filmParams: FilmParams) {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.getFilmQueryParams(filmParams),
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  getFilmQueryParams(filmParams: FilmParams) {
    return {
      ...this.filterDeepLinkingService.getFilterQueryParams(filmParams.filterParams),
      ...this.paginationDeepLinkingService.getPaginationQueryParams(filmParams),
      showHiddens: filmParams.showHiddens ? true : undefined
    };
  }

  getFilmParams(): FilmParams {
    let filmParams: FilmParams;

    const paginatedParams = this.paginationDeepLinkingService.getPaginatedParams();

    if (paginatedParams)
      filmParams = paginatedParams as FilmParams;
    else
      filmParams = new PaginatedParams(10, 1) as FilmParams;

    const filterParams = this.filterDeepLinkingService.getFilterParams();
    if (filterParams)
      filmParams.filterParams = filterParams;

    const showHiddens = this.route.snapshot.queryParamMap.get("showHiddens");
    filmParams.showHiddens = showHiddens != null ? showHiddens === "true" : null;

    return filmParams;
  }
}
