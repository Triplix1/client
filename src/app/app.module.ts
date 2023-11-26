import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './Core/interceptors/loading.interceptor';
import { JwtInterceptor } from './Core/interceptors/jwt.interceptor';
import { SharedModule } from './Shared/shared.module';
import { MainModule } from './Modules/main/main.module';
import { GenresModule } from './Modules/genres/genres.module';
import { FilmsModule } from './Modules/films/films.module';
import { AuthenticationModule } from './Modules/authentication/authentication.module';
import { AdminsModule } from './Modules/admins/admins.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MainModule,
    GenresModule,
    FilmsModule,
    AuthenticationModule,
    AdminsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
