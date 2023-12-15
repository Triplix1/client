import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilmParams } from 'src/app/Core/helpers/filmParams';
import { FilterParams } from 'src/app/Core/helpers/filterParams';
import { PaginatedParams } from 'src/app/Core/helpers/paginatedParams';
import { AccountService } from 'src/app/Core/services/account.service';
import { FilmDeepLinkingService } from 'src/app/Core/services/film-deep-linking.service';
import { FilmService } from 'src/app/Core/services/film.service';
import { FilterDeepLinkingService } from 'src/app/Core/services/filter-deep-linking.service';
import { NavigationService } from 'src/app/Core/services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  filmsParams: FilmParams = new PaginatedParams(5, 1) as FilmParams;
  isAdmin: boolean = false;
  labelPosition: 'before' | 'after' = 'before';
  subscriptions: Subscription[] = [];
  private filterDeepLinkingService: FilterDeepLinkingService = new FilterDeepLinkingService(this.route, this.router)

  constructor(private filmService: FilmService,
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,
    private accountService: AccountService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  applyFiltration(filterParams: FilterParams) {
    this.router.navigate(['/list'], {
      queryParams: this.filterDeepLinkingService.getFilterQueryParams(filterParams),
    })
  }

  showHiddensChange(value: boolean) {
    this.router.navigate(['/list'], {
      queryParams: { showHiddens: value ? value : undefined }
    })
  }

  navigateToCreate() {
    this.router.navigate(['/create']);
  }

}
