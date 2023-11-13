import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationDeepLinkingService } from '../_services/pagination-deep-linking.service';
import { PaginatedParams } from '../_helpers/paginatedParams';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input({ required: true }) itemsPerPage: number[] = [10];
  @Output() changePage: EventEmitter<PaginatedParams> = new EventEmitter<PaginatedParams>();
  @Input({ required: true }) totalItems: number = 0;
  paginatedParams: PaginatedParams = new PaginatedParams(this.itemsPerPage[0], 1);

  get totalPages(): number {
    //return Math.ceil(this.totalItems / this.paginatedParams.pageSize);
    return 10;
  }

  constructor(private paginationDeepLinkingService: PaginationDeepLinkingService) {

  }
  ngOnInit(): void {
    const paginatedParams = this.paginationDeepLinkingService.getPaginatedParams();
    if (paginatedParams)
      this.paginatedParams = paginatedParams;
  }

  onPageChange(page: number) {
    this.paginatedParams.pageNumber = +page;
    this.paginationDeepLinkingService.setPaginatedParams(this.paginatedParams);
    this.changePage.emit(this.paginatedParams)
  }

  onPageSizeChange(pageSize: number) {
    this.paginatedParams.pageNumber = 1;
    this.paginatedParams.pageSize = +pageSize;
    this.paginationDeepLinkingService.setPaginatedParams(this.paginatedParams);
    this.changePage.emit(this.paginatedParams);
  }
}
