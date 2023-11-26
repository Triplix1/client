import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../Core/services/account.service';
import { ActivatedRoute, NavigationEnd, Router, UrlSerializer, UrlTree } from '@angular/router';
import { filter } from 'rxjs';
import { AuthorizationUseDeepLinkingService } from '../../../Core/services/authorization-use-deep-linking.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser = this.accountService.currentUser$;
  currentRoute: string | undefined;
  isAdmin: boolean = false;
  authorizationUseDeepLinkingService: AuthorizationUseDeepLinkingService = new AuthorizationUseDeepLinkingService(this.router, this.route, this.urlSerializer);

  constructor(private accountService: AccountService, private router: Router, private urlSerializer: UrlSerializer, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.getCurrentRoute(this.route.root);
      });

    this.accountService.isCurrentUserAdmin().subscribe(isAdmin => this.isAdmin = isAdmin ?? false);
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
