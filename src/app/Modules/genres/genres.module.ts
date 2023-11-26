import { NgModule } from '@angular/core';
import { GenresRoutingModule } from './genres-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { GenresComponent } from './genres/genres.component';



@NgModule({
  declarations: [
    GenresComponent,
  ],
  imports: [
    SharedModule,
    GenresRoutingModule,
  ]
})
export class GenresModule { }
