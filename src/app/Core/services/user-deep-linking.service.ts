import { Injectable } from '@angular/core';
import { PaginationDeepLinkingService } from './pagination-deep-linking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserParams } from '../helpers/userParams';
import { User } from '../../Models/User/user';
import { PaginatedParams } from '../helpers/paginatedParams';

@Injectable({
  providedIn: 'root'
})
export class UserDeepLinkingService {
  private paginationDeepLinkingService = new PaginationDeepLinkingService(this.route, this.router);

  constructor(private route: ActivatedRoute, private router: Router) { }

  setUserParams(userParams: UserParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.paginationDeepLinkingService.getPaginationQueryParams(userParams)
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  getUserParams(): UserParams {
    let userParams: UserParams;

    const paginatedParams = this.paginationDeepLinkingService.getPaginatedParams();

    if (paginatedParams)
      userParams = paginatedParams as UserParams;
    else
      userParams = new PaginatedParams(10, 1) as UserParams;

    return userParams;
  }
}
