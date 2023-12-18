import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { FilmParams } from 'src/app/Core/helpers/filmParams';
import { FilterParams } from 'src/app/Core/helpers/filterParams';
import { PaginatedParams } from 'src/app/Core/helpers/paginatedParams';
import { AccountService } from 'src/app/Core/services/account.service';
import { FilmDeepLinkingService } from 'src/app/Core/services/film-deep-linking.service';
import { FilmService } from 'src/app/Core/services/film.service';
import { FilterDeepLinkingService } from 'src/app/Core/services/filter-deep-linking.service';
import { NavigationService } from 'src/app/Core/services/navigation.service';
import { FilmCardResponse } from 'src/app/Models/Film/FilmCardResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private filmsParams: FilmParams = new PaginatedParams(5, 1) as FilmParams;
  topFilmsParams: FilmParams = { ...this.filmsParams, filterParams: { ...this.filmsParams.filterParams, orderByParams: { asc: false, orderBy: 'Рейтинг' }, expected: false } };
  topHorrorFilmsParams: FilmParams = { ...this.filmsParams, filterParams: { ...this.filmsParams.filterParams, orderByParams: { asc: false, orderBy: 'Рейтинг' }, expected: false, genre: "Жахи" } };
  latestFilmsParams: FilmParams = { ...this.filmsParams, filterParams: { ...this.filmsParams.filterParams, orderByParams: { asc: false, orderBy: 'Дата' } } };
  topRating: FilmCardResponse[] = [];
  topHorrors: FilmCardResponse[] = [];
  latestFilms: FilmCardResponse[] = [];
  private filterDeepLinkingService: FilterDeepLinkingService = new FilterDeepLinkingService(this.route, this.router);
  private filmDeepLinkingService: FilmDeepLinkingService = new FilmDeepLinkingService(this.route, this.router);

  constructor(private filmService: FilmService,
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,
    private accountService: AccountService) {
  }
  ngOnInit(): void {
    // { pageNumber: 1, pageSize: 5, filterParams: { expected: false, genre: null, orderByParams: { asc: false, orderBy: 'Рейтинг' }, search: null, year: null }, showHiddens: false }
    this.filmService.getFilmCards(this.topFilmsParams).pipe(take(1)).subscribe(
      response => {
        if (response.items)
          this.topRating = response.items;
      }
    )

    this.filmService.getFilmCards(this.topHorrorFilmsParams).pipe(take(1)).subscribe(
      response => {
        if (response.items)
          this.topHorrors = response.items;
      }
    )

    this.filmService.getFilmCards(this.latestFilmsParams).pipe(take(1)).subscribe(
      response => {
        if (response.items)
          this.latestFilms = response.items;
      }
    )
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

  showAllFilms(filmParams: FilmParams) {
    this.router.navigate(["/list"],
      {
        queryParams: this.filmDeepLinkingService.getFilmQueryParams(filmParams),
      })
  }
}
