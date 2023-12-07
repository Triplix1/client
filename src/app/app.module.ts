import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './Core/interceptors/loading.interceptor';
import { JwtInterceptor } from './Core/interceptors/jwt.interceptor';
import { SharedModule } from './Shared/shared.module';
import { MainModule } from './Modules/main/main.module';
import { GenresModule } from './Modules/genres/genres.module';
import { FilmsModule } from './Modules/films/films.module';
import { AuthenticationModule } from './Modules/authentication/authentication.module';
import { AdminsModule } from './Modules/admins/admins.module';
import { ErrorHandlerInterceptor } from './Core/interceptors/error-handler.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { UserModule } from './Modules/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    MainModule,
    GenresModule,
    FilmsModule,
    AuthenticationModule,
    AdminsModule,
    UserModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1038141147992-9tbh1kiha40f9cb7s5ve10rttgusfa8k.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1477381113106897')
          }
        ]
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
