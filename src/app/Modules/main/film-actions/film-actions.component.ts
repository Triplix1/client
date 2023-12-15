import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterParams } from 'src/app/Core/helpers/filterParams';
import { AccountService } from 'src/app/Core/services/account.service';

@Component({
  selector: 'app-film-actions',
  templateUrl: './film-actions.component.html',
  styleUrls: ['./film-actions.component.scss']
})
export class FilmActionsComponent {
  @Output() onFiltration: EventEmitter<FilterParams> = new EventEmitter<FilterParams>();
  @Output() onShowHiddensChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() labelPosition: 'before' | 'after' = 'before';
  @Input() showHiddens: boolean = false;

  constructor(public accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) { }

  applyFiltration(filterParams: FilterParams) {
    this.onFiltration.emit(filterParams);
  }

  navigateToCreate() {
    this.router.navigate(['/create']);
  }
  changeShowHiddens() {
    this.showHiddens = !this.showHiddens;
    this.onShowHiddensChange.emit(this.showHiddens);
  }
}
