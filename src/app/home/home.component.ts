import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FilmService } from '../_services/film.service';
import { PaginationDeepLinkingService } from '../_services/pagination-deep-linking.service';
import { FilmParams } from '../_helpers/filmParams';
import { PaginatedParams } from '../_helpers/paginatedParams';
import { FilterParams } from '../_helpers/filterParams';
import { PaginationService } from '../_services/pagination.service';
import { FilmDeepLinkingService } from '../_services/film-deep-linking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../_services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  paginatedData: any[] = [];
  totalItems: number = 0;
  filmsParams: FilmParams = new PaginatedParams(5, 1) as FilmParams;

  private filmDeepLinkingService: FilmDeepLinkingService = new FilmDeepLinkingService(this.route, this.router)

  constructor(private filmService: FilmService,
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService) {
  }

  ngOnInit(): void {

    this.navigationService.setupPopstateListener(() => {
      this.navigationService.reloadPage();
    });

    this.filmsParams = this.filmDeepLinkingService.getFilmParams();

    this.filmDeepLinkingService.setFilmParams(this.filmsParams);
    this.fetchData(this.filmsParams as FilmParams);

  }

  fetchData(pagedParams: PaginatedParams): void {
    const filmParams = pagedParams as FilmParams;

    this.filmService.getFilmCards(filmParams).subscribe(
      (data) => {

        if (data) {
          this.paginatedData = data.items ?? [];
          this.totalItems = data.totalCount ?? 0;
          this.filmsParams.pageNumber = data.currentPage ?? 1;
          this.filmsParams.pageSize = data.pageSize ?? 0;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPaginationChange(pagedParams: PaginatedParams): void {
    this.filmsParams.pageNumber = pagedParams.pageNumber;
    this.filmsParams.pageSize = pagedParams.pageSize;
    this.fetchData(this.filmsParams);
  }

  onFilmDelete(filmId: string) {
    this.paginatedData = this.paginatedData.filter(d => d.id !== filmId);
  }

  applyPagination(filterParams: FilterParams) {
    this.filmsParams.filterParams.genre = filterParams.genre;
    this.filmsParams.filterParams.year = filterParams.year;
    this.filmsParams.filterParams.orderBy = filterParams.orderBy;
    this.filmsParams.filterParams.expected = filterParams.expected;
    this.fetchData(this.filmsParams);
  }
}
