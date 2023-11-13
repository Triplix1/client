import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../general-styles/authorization.css', './login.component.css']
})
export class LoginComponent {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(private accountService: AccountService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
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
        this.router.navigateByUrl('/');
      },
      error: error => {
        this.validationErrors = error;
      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
