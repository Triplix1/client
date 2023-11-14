import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ActivatedRoute, NavigationEnd, Router, UrlSerializer, UrlTree } from '@angular/router';
import { filter } from 'rxjs';
import { AuthorizationUseDeepLinkingService } from '../_services/authorization-use-deep-linking.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentUser = this.accountService.currentUser$;
  private returnUrl: string | undefined;
  currentRoute: string | undefined;
  authorizationUseDeepLinkingService: AuthorizationUseDeepLinkingService = new AuthorizationUseDeepLinkingService(this.router, this.route, this.urlSerializer);

  constructor(private accountService: AccountService, private router: Router, private urlSerializer: UrlSerializer, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.getCurrentRoute(this.route.root);
      });
  }

  logOut() {
    this.accountService.logout();
    window.location.reload();
  }

  shouldShowButton(): boolean {
    return this.currentRoute !== 'register' && this.currentRoute !== 'login';
  }

  private getCurrentRoute(route: ActivatedRoute): string {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.url.map(segment => segment.path).join('/');
  }
}
