import { NgModule } from '@angular/core';
import { AdminsRoutingModule } from './admins-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AdminsComponent } from './admins/admins.component';



@NgModule({
  declarations: [
    AdminsComponent,
  ],
  imports: [
    AdminsRoutingModule,
    SharedModule,
  ]
})
export class AdminsModule { }
