import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ClarityModule } from '@clr/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CreateButtonComponent } from './Components/create-button/create-button.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { PlayerComponent } from './Components/player/player.component';
import { TextInputComponent } from './Components/text-input/text-input.component';
import { MaterialModule } from '../Material/material.module';
import { TrailersComponent } from './Components/trailers/trailers.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    CreateButtonComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    PaginationComponent,
    PlayerComponent,
    TextInputComponent,
    TrailersComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BsDropdownModule,
    ClarityModule,
    NgxSpinnerModule.forRoot({
      type: 'ball-clip-rotate'
    }),
    TabsModule.forRoot(),
    RatingModule,
    CarouselModule.forRoot(),
    MaterialModule,
  ],
  exports: [
    CommonModule,
    AppRoutingModule,
    BsDropdownModule,
    ClarityModule,
    NgxSpinnerModule,
    TabsModule,
    RatingModule,
    CarouselModule,
    CreateButtonComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    PaginationComponent,
    PlayerComponent,
    TextInputComponent,
    MaterialModule,
    TrailersComponent,
  ]
})
export class SharedModule { }
