import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from 'src/app/Core/guards/admin.guard';
import { CreateFilmComponent } from './create-film/create-film.component';
import { FilmPageComponent } from './film-page/film-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'films/:filmId', component: FilmPageComponent },
      { path: 'create', component: CreateFilmComponent, canActivate: [adminGuard] },
      { path: 'edit/:filmId', component: CreateFilmComponent, canActivate: [adminGuard] },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
