import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { FilmActionsComponent } from './film-actions/film-actions.component';


@NgModule({
  declarations: [
    FilterComponent,
    ListComponent,
    HomeComponent,
    FilmActionsComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
