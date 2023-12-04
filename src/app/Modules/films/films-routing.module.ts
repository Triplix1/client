import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from 'src/app/Core/guards/admin.guard';
import { CreateFilmComponent } from './create-film/create-film.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { CanDeactivateGuard } from 'src/app/Core/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'films/:filmId', component: FilmPageComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'create', component: CreateFilmComponent, canActivate: [adminGuard], canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:filmId', component: CreateFilmComponent, canActivate: [adminGuard], canDeactivate: [CanDeactivateGuard] },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
