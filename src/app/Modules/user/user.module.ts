import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
