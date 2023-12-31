import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FilmService } from '../../../Core/services/film.service';
import { PaginationDeepLinkingService } from '../../../Core/services/pagination-deep-linking.service';
import { FilmParams } from '../../../Core/helpers/filmParams';
import { PaginatedParams } from '../../../Core/helpers/paginatedParams';
import { FilterParams } from '../../../Core/helpers/filterParams';
import { PaginationService } from '../../../Core/services/pagination.service';
import { FilmDeepLinkingService } from '../../../Core/services/film-deep-linking.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../../Core/services/navigation.service';
import { AccountService } from '../../../Core/services/account.service';
import { PaginatedResult } from '../../../Core/helpers/pagination';
import { FilmCardResponse } from '../../../Models/Film/FilmCardResponse';
import { Subscription, filter, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  paginatedData: any[] = [];
  totalItems: number = 0;
  filmsParams: FilmParams = new PaginatedParams(5, 1) as FilmParams;
  isAdmin: boolean = false;
  labelPosition: 'before' | 'after' = 'before';
  subscriptions: Subscription[] = [];
  private filmDeepLinkingService: FilmDeepLinkingService = new FilmDeepLinkingService(this.route, this.router)

  constructor(private filmService: FilmService,
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,
    private accountService: AccountService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    // this.navigationService.setupPopstateListener(() => {
    //   this.loadParams();
    // });

    this.subscriptions.push(this.route.queryParamMap.subscribe(params => {
      const search = params.get('search');
      if (search !== this.filmsParams.filterParams.search) {
        this.loadParams();
      }
    }));

    this.loadParams();
  }

  private loadParams() {
    this.accountService.isCurrentUserAdmin().pipe(take(1)).subscribe(
      isAdmin => this.isAdmin = isAdmin ?? false);
    this.filmsParams = this.filmDeepLinkingService.getFilmParams();
    this.filmsParams.showHiddens = this.filmsParams.showHiddens ?? false;

    this.filmDeepLinkingService.setFilmParams(this.filmsParams);
    this.fetchData(this.filmsParams as FilmParams);
  }

  fetchData(pagedParams: PaginatedParams): void {
    const filmParams = pagedParams as FilmParams;

    if (!this.isAdmin) {
      this.filmService.getFilmCards(filmParams).pipe(take(1)).subscribe(
        (data) => {

          if (data) {
            this.mapPaginatedResponse(data)
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.filmService.getAllFilmCards(filmParams).pipe(take(1)).subscribe(
        (data) => {

          if (data) {
            this.mapPaginatedResponse(data)
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  private mapPaginatedResponse(data: PaginatedResult<FilmCardResponse[]>) {
    this.paginatedData = data.items ?? [];
    this.totalItems = data.totalCount ?? 0;
    this.filmsParams.pageNumber = data.currentPage ?? 1;
    this.filmsParams.pageSize = data.pageSize ?? 0;
  }

  onPaginationChange(pagedParams: PaginatedParams): void {
    this.filmsParams.pageNumber = pagedParams.pageNumber;
    this.filmsParams.pageSize = pagedParams.pageSize;
    this.fetchData(this.filmsParams);
  }

  onFilmDelete(filmId: string) {
    this.paginatedData = this.paginatedData.filter(d => d.id !== filmId);
  }

  applyFiltration(filterParams: FilterParams) {
    this.filmsParams.filterParams.genre = filterParams.genre;
    this.filmsParams.filterParams.year = filterParams.year;
    this.filmsParams.filterParams.orderByParams = filterParams.orderByParams;
    this.filmsParams.filterParams.expected = filterParams.expected;
    this.fetchData(this.filmsParams);
  }

  showHiddensChange(value: boolean) {
    this.filmsParams.showHiddens = value;
    this.filmDeepLinkingService.setFilmParams(this.filmsParams);
    this.fetchData(this.filmsParams);
  }

  navigateToCreate() {
    this.router.navigate(['/create']);
  }
}
