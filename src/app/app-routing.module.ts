import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Modules/main/home/home.component';
import { RegisterComponent } from './Modules/authentication/register/register.component';
import { LoginComponent } from './Modules/authentication/login/login.component';
import { FilmPageComponent } from './Modules/films/film-page/film-page.component';
import { CreateFilmComponent } from './Modules/films/create-film/create-film.component';
import { GenresComponent } from './Modules/genres/genres/genres.component';
import { adminGuard } from './Core/guards/admin.guard';
import { AdminsComponent } from './Modules/admins/admins/admins.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
