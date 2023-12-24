import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, pipe, take } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/Core/guards/can-deactivate.guard';
import { AccountService } from 'src/app/Core/services/account.service';
import { UserService } from 'src/app/Core/services/user.service';
import { AccountInfoResponse } from 'src/app/Models/User/accountInfoResponse';
import { UserUpdateRequest } from 'src/app/Models/User/userUpdateRequest';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss', '../../../Shared/styles/image-uploader.scss']
})
export class AccountComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  user: AccountInfoResponse | null = null;
  imageUrl: string | ArrayBuffer | null | undefined;
  subscriptions: Subscription[] = [];
  userForm = this.fb.group({
    nickname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
    file: new FormControl<File | null>(null),
  })
  email: string | null = null;
  aspectRatio: string = "1:1";
  canLeaveValue: boolean = true;

  constructor(private accountService: AccountService, private userService: UserService, private fb: FormBuilder, private router: Router, private toastrService: ToastrService) { }

  canLeave(): boolean {
    return this.canLeaveValue;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.accountService.currentUser$.subscribe(
      user => {
        if (user) {
          this.subscriptions.push(this.userService.getAccountInfo().subscribe(
            accountInfo => {
              this.user = accountInfo;
              this.userForm.patchValue(accountInfo);
              this.imageUrl = accountInfo.photoUrl + `?Da=${Date.now()}`;
              this.canLeaveValue = true;
            }
          ))
        }
      }
    ))

    this.subscriptions.push(this.userForm.valueChanges
      .subscribe(value => {
        if (this.user)
          this.canLeaveValue = value.file == null && value.nickname === this.user.nickname;
        else
          this.canLeaveValue = true;
      }));

    this.canLeaveValue = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  handleFileInput(imageInput: any | null) {
    if (imageInput) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (this.isValidAspectRatio(img.width, img.height)) {
            this.imageUrl = e.target?.result;
            this.userForm.get('file')?.setValue(imageInput);
          } else {
            this.toastrService.warning(`Please upload an image with a ${this.aspectRatio} aspect ratio.`);
          }
        };
        img.src = URL.createObjectURL(imageInput);
      };
      reader.readAsDataURL(imageInput);
    }
  }

  private isValidAspectRatio(width: number, height: number): boolean {
    const expectedRatio = this.aspectRatio.split(':').map(Number);
    const actualRatio = [width, height].map(Number);
    return (actualRatio[0] / actualRatio[1]).toFixed(1) === (expectedRatio[0] / expectedRatio[1]).toFixed(1);
  }

  sendData() {
    if (this.user) {
      const file = this.userForm.get('file')?.value

      const userUpdateRequest: UserUpdateRequest =
      {
        id: this.user?.id,
        nickname: this.userForm.get('nickname')?.value ?? "",
        file: file ?? null,
      }
      this.userService.updateAccountInfo(userUpdateRequest).pipe(take(1)).subscribe(
        response => {
          this.canLeaveValue = true;
          this.toastrService.success('Успішно оновлено!');
          this.accountService.currentUser$.pipe(take(1)).subscribe(
            user => {
              if (user) {
                user.photoUrl = response.photoUrl;
                user.nickname = response.nickname;
                this.accountService.setCurrentUser(user);
              }
            }
          )
        }
      );

      this.canLeaveValue = true
    }
  }

  onUnsubscribe(id: string) {
    if (this.user) {
      this.user.subscribedTo = this.user.subscribedTo.filter(fc => fc.id !== id);
    }
  }
}
