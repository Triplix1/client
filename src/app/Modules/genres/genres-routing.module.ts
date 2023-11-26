import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './genres/genres.component';
import { adminGuard } from 'src/app/Core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'genres', component: GenresComponent, canActivate: [adminGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class GenresRoutingModule { }
