import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../../Core/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationDeepLinkingService } from '../../../Core/services/authorization-deep-linking.service';
import { ExternalAuthDto } from 'src/app/Models/externalAuthDto';
import { HttpErrorResponse } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../_general-styles/authorization.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  returnUrl: string | undefined;
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  authorizationService: AuthorizationDeepLinkingService = new AuthorizationDeepLinkingService(this.route);

  constructor(private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.returnUrl = this.authorizationService.getReturnUrl();

    this.socialAuthService.authState
      .subscribe((user: SocialUser) => {
        if (user) {
          this.accountService.externalLogin({ idToken: user.idToken, provider: user.provider }).subscribe();
          this.router.navigate(['/home'])
        }
      });
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      email: ['',],
      password: ['',],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  login() {
    this.accountService.login(this.registerForm.value).subscribe({
      next: response => {
        this.router.navigateByUrl(this.returnUrl || "/");
      },
      error: error => {
        this.validationErrors = error;
      }
    })
  }

  cancel() {
    this.router.navigateByUrl(this.returnUrl || "/");
  }

  externalLogin = () => {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.accountService.externalLogin({ idToken: user.idToken, provider: user.provider }).subscribe();
        this.router.navigate(['/home'])
      });

    // this.accountService.signInWithGoogle();

    // this.accountService.extAuthChanged.subscribe(user => {
    //   const externalAuth: ExternalAuthDto = {
    //     provider: user.provider,
    //     idToken: user.idToken
    //   }
    //   this.validateExternalAuth(externalAuth);
    // })
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.accountService.externalLogin({ idToken: user.idToken, provider: user.provider }).subscribe();
        this.router.navigate(['/home'])
      });
  }

  // private validateExternalAuth(externalAuth: ExternalAuthDto) {
  //   this.accountService.externalLogin('api/accounts/externallogin', externalAuth)
  //     .subscribe({
  //       next: (res) => {
  //         localStorage.setItem("token", res.token);
  //         this.accountService.sendAuthStateChangeNotification(res.isAuthSuccessful);
  //         this.router.navigate([this.returnUrl]);
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         this.accountService.signOutExternal();
  //       }
  //     });
  // }
}
