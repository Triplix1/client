import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationUseDeepLinkingService {

  constructor(private router: Router, private route: ActivatedRoute, private urlSerializer: UrlSerializer) { }

  navigateToLogin() {
    this.router.navigate(["login"], {
      queryParams: {
        returnUrl: this.getReturnUrl(),
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  navigateToRegister(admin: boolean = false) {
    this.router.navigate(["register"], {
      queryParams: {
        returnUrl: this.getReturnUrl(),
        admin: admin
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  getReturnUrl() {
    const urlTree: UrlTree = this.router.createUrlTree([], { relativeTo: this.router.routerState.root });
    const returnUrl = this.urlSerializer.serialize(urlTree);
    return returnUrl;
  }
}
