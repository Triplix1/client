import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FilmPageComponent } from './film-page/film-page.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: '',
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'films/:filmId', component: FilmPageComponent },
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
