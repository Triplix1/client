import { NgModule } from '@angular/core';
import { FilmsRoutingModule } from './films-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CommentComponent } from './comment/comment.component';
import { CreateFilmComponent } from './create-film/create-film.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { RatingComponent } from './rating/rating.component'
import { TabsComponent } from './tabs/tabs.component';



@NgModule({
  declarations: [
    CommentComponent,
    CreateFilmComponent,
    FilmPageComponent,
    RatingComponent,
    TabsComponent
  ],
  imports: [
    SharedModule,
    FilmsRoutingModule,
  ]
})
export class FilmsModule { }
