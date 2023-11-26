import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { adminGuard } from 'src/app/Core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'admins', component: AdminsComponent, canActivate: [adminGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AdminsRoutingModule { }
