import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../../Core/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationDeepLinkingService } from '../../../Core/services/authorization-deep-linking.service';

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
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
    this.returnUrl = this.authorizationService.getReturnUrl();
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
}
