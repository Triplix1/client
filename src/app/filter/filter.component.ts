import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FiltersService } from '../_services/filters.service';
import { FilterDeepLinkingService } from '../_services/filter-deep-linking.service';
import { FilterParams } from '../_helpers/filterParams';
import { OrderByParams } from '../_helpers/orderByParams';

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
    this.filtersService.getYersList().subscribe(
      data => this.years = data,
      error => console.log(error)
    );

    this.filtersService.getGenresList().subscribe(
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
  setOrderBy(orderBy: string) {
    if (this.filterParams.orderBy)
      this.filterParams.orderBy.orderBy = orderBy;
    else
      this.filterParams.orderBy = new OrderByParams(orderBy, false);

    this.applyFiltration();
  }

  private applyFiltration() {
    this.filterDeepLinkingService.setFilterParams(this.filterParams);
    this.loadData.emit(this.filterParams);
  }
}
