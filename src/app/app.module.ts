import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TrailersComponent } from './trailers/trailers.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FilmCardComponent } from './film-card/film-card.component';
import { ClarityModule } from "@clr/angular";
import { FilterComponent } from './filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './register/register.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RatingComponent } from './rating/rating.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsComponent } from './tabs/tabs.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    TrailersComponent,
    PaginationComponent,
    FilmCardComponent,
    FilterComponent,
    RegisterComponent,
    TextInputComponent,
    LoginComponent,
    FilmPageComponent,
    RatingComponent,
    TabsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({
      type: 'ball-clip-rotate'
    }),
    BsDropdownModule,
    MatCardModule,
    MatButtonModule,
    ClarityModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    TabsModule.forRoot(),
    RatingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
