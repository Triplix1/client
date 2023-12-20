import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AccountService } from '../../../Core/services/account.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationDeepLinkingService } from '../../../Core/services/authorization-deep-linking.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../_general-styles/authorization.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @Output() cancelRegister = new EventEmitter();
  admin: boolean = false;
  returnUrl: string | undefined;
  registerForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  validationErrors: string[] | undefined;
  authorizationService: AuthorizationDeepLinkingService = new AuthorizationDeepLinkingService(this.route);
  errorMessage: string | undefined;
  private subscriptions: Subscription[] = []

  constructor(private accountService: AccountService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.initializeForm();
    this.returnUrl = this.authorizationService.getReturnUrl();
    this.admin = this.authorizationService.getIsAdmin();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    this.subscriptions.push(this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    }));
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value ? null : { isMatching: true }
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).pipe(take(1)).subscribe({
      next: _ => {
        this.router.navigateByUrl(this.returnUrl ?? '/');
      },
      error: error => {
        this.validationErrors = error;
      }
    })
  }

  cancel() {
    this.router.navigateByUrl(this.returnUrl ?? '/');
  }
}