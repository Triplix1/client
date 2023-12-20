import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FiltersService } from '../../../Core/services/filters.service';
import { FilterDeepLinkingService } from '../../../Core/services/filter-deep-linking.service';
import { FilterParams } from '../../../Core/helpers/filterParams';
import { OrderByParams } from '../../../Core/helpers/orderByParams';
import { take } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() loadData: EventEmitter<FilterParams> = new EventEmitter<FilterParams>();
  years: number[] = [];
  genres: string[] = [];
  filterParams: FilterParams = new FilterParams(null, null, null, null);

  constructor(private filtersService: FiltersService, private filterDeepLinkingService: FilterDeepLinkingService) {
  }

  ngOnInit(): void {
    this.filtersService.getYersList().pipe(take(1)).subscribe(
      data => this.years = data,
      error => console.log(error)
    );

    this.filtersService.getGenresList().pipe(take(1)).subscribe(
      genres => this.genres = genres,
      error => console.log(error)
    );

    this.filterParams = this.filterDeepLinkingService.getFilterParams() as FilterParams;
  }

  setYear(year: number | null) {
    this.filterParams.year = year;

    this.applyFiltration();
  }

  setGenre(genre: string | null) {
    this.filterParams.genre = genre;

    this.applyFiltration();
  }

  setExpected(expected: boolean | null) {
    this.filterParams.expected = expected

    return this.applyFiltration();
  }

  setOrderBy(orderBy: "Назва" | "Дата" | "Рейтинг") {
    if (this.filterParams.orderByParams)
      this.filterParams.orderByParams.orderBy = orderBy;
    else
      this.filterParams.orderByParams = new OrderByParams(orderBy, false);

    this.applyFiltration();
  }

  changeSortDirection() {
    if (!this.filterParams.orderByParams)
      this.filterParams.orderByParams = { asc: true, orderBy: "Рейтинг" }
    this.filterParams.orderByParams.asc = !this.filterParams.orderByParams.asc;

    this.applyFiltration();
  }

  private applyFiltration() {
    this.filterDeepLinkingService.setFilterParams(this.filterParams);
    this.loadData.emit(this.filterParams);
  }
}
