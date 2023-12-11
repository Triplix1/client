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
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { FilmCardComponent } from './Components/film-card/film-card.component';

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
    FilmCardComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BsDropdownModule,
    ClarityModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule.forRoot({
      type: 'ball-clip-rotate'
    }),
    TabsModule.forRoot(),
    RatingModule,
    CarouselModule.forRoot(),
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    ToastrModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    FilmCardComponent,
  ]
})
export class SharedModule { }
