import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationDeepLinkingService } from './pagination-deep-linking.service';
import { GenreParams } from '../_helpers/genreParams';
import { PaginatedParams } from '../_helpers/paginatedParams';

@Injectable({
  providedIn: 'root'
})
export class GenreDeepLinkingService {

  private paginationDeepLinkingService: PaginationDeepLinkingService = new PaginationDeepLinkingService(this.route, this.router);

  constructor(private route: ActivatedRoute, private router: Router) { }

  setGenreParams(genreParams: GenreParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.paginationDeepLinkingService.getPaginationQueryParams(genreParams)
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  getGenreParams(): GenreParams {
    let genreParams: GenreParams;

    const paginatedParams = this.paginationDeepLinkingService.getPaginatedParams();

    if (paginatedParams)
      genreParams = paginatedParams as GenreParams;
    else
      genreParams = new PaginatedParams(10, 1) as GenreParams;

    return genreParams;
  }
}
