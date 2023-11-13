import { Injectable } from '@angular/core';
import { FilterDeepLinkingService } from './filter-deep-linking.service';
import { PaginationDeepLinkingService } from './pagination-deep-linking.service';
import { FilmParams } from '../_helpers/filmParams';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedParams } from '../_helpers/paginatedParams';

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
      queryParams: {
        ...this.filterDeepLinkingService.getFilterQueryParams(filmParams.filterParams),
        ...this.paginationDeepLinkingService.getPaginationQueryParams(filmParams)
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
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

    return filmParams;
  }
}
