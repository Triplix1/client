import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';
import { FilmCardComponent } from '../../Shared/Components/film-card/film-card.component';



@NgModule({
  declarations: [
    FilterComponent,
    HomeComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
