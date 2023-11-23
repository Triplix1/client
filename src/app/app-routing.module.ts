import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { CreateFilmComponent } from './create-film/create-film.component';
import { GenresComponent } from './genres/genres.component';
import { adminGuard } from './_guards/admin.guard';
import { AdminsComponent } from './admins/admins.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: '',
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'films/:filmId', component: FilmPageComponent },
      { path: 'create', component: CreateFilmComponent, canActivate: [adminGuard] },
      { path: 'edit/:filmId', component: CreateFilmComponent, canActivate: [adminGuard] },
      { path: 'genres', component: GenresComponent, canActivate: [adminGuard] },
      { path: 'admins', component: AdminsComponent, canActivate: [adminGuard] },
      // {path: 'members/:username', component: MemberDetailComponent, resolve: {member: memberDetailedResolver}},
      // {path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
      // {path: 'lists', component: ListsComponent},
      // {path: 'messages', component: MessagesComponent},
      // {path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
