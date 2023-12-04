import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../Core/services/account.service';
import { ActivatedRoute, NavigationEnd, Router, UrlSerializer, UrlTree } from '@angular/router';
import { filter } from 'rxjs';
import { AuthorizationUseDeepLinkingService } from '../../../Core/services/authorization-use-deep-linking.service';
import { NavbarService } from 'src/app/Core/services/navbar.service';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser = this.accountService.currentUser$;
  isAdmin: boolean = false;
  authorizationUseDeepLinkingService: AuthorizationUseDeepLinkingService = new AuthorizationUseDeepLinkingService(this.router, this.route, this.urlSerializer);
  searchValue: string | null = null;
  private currentRoute: string | undefined;
  private navbarService: NavbarService = new NavbarService(this.route, this.router);

  get searchIcon() {
    return `<span class="input-group-text border-0 bg-opacity-0"
    id="search-addon">
  <i class="fa fa-search text-white"
     style="color: #ffffff;"></i>
</span>`
  }

  constructor(private accountService: AccountService, private router: Router, private urlSerializer: UrlSerializer, private route: ActivatedRoute, private matIconRegistry: MatIconRegistry) {
    matIconRegistry.addSvgIconLiteral("search", `<span class="input-group-text border-0 bg-opacity-0"
    id="search-addon">
  <i class="fa fa-search text-white"
     style="color: #ffffff;"></i>
</span>`)
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.getCurrentRoute(this.route.root);
        //this.searchValue = this.navbarService.loadSearchField();
      });

    this.accountService.isCurrentUserAdmin().subscribe(isAdmin =>
      this.isAdmin = isAdmin ?? false);
  }

  logOut() {
    this.accountService.logout();
    window.location.reload();
  }

  shouldShowButton(): boolean {
    return this.currentRoute !== 'register' && this.currentRoute !== 'login';
  }

  search() {
    this.router.navigate(["/home"], {
      queryParams: {
        search: this.searchValue,
      },
      replaceUrl: true
    })
  }

  private getCurrentRoute(route: ActivatedRoute): string {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.url.map(segment => segment.path).join('/');
  }
}
