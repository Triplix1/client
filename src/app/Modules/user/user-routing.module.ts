import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { authGuard } from 'src/app/Core/guards/auth.guard';
import { CanDeactivateGuard } from 'src/app/Core/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'account', component: AccountComponent, canActivate: [authGuard], canDeactivate: [CanDeactivateGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
