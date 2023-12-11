import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../../Core/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationDeepLinkingService } from '../../../Core/services/authorization-deep-linking.service';
import { ExternalAuthDto } from 'src/app/Models/User/externalAuthDto';
import { HttpErrorResponse } from '@angular/common/http';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
