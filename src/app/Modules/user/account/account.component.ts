import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/Core/guards/can-deactivate.guard';
import { AccountService } from 'src/app/Core/services/account.service';
import { UserService } from 'src/app/Core/services/user.service';
import { AccountInfoResponse } from 'src/app/Models/User/accountInfoResponse';
import { User } from 'src/app/Models/User/user';
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

  constructor(private accountService: AccountService, private userService: UserService, private fb: FormBuilder, private router: Router) { }

  canLeave(): boolean {
    return this.canLeaveValue;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.accountService.currentUser$.subscribe(
      user => {
        if (user) {
          this.userService.getAccountInfo().pipe(take(1)).subscribe(
            accountInfo => {
              this.user = accountInfo;
              this.userForm.setValue({ nickname: user.nickname, file: null });
              this.imageUrl = accountInfo.photoUrl;
            }
          )
        }
      }
    ))

    this.subscriptions.push(this.userForm.valueChanges.subscribe(_ => this.canLeaveValue = false));
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
            alert('Please upload an image with a 2:3 aspect ratio.');
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  sendData() {
    const file = this.userForm.get('file')?.value

    const userUpdateRequest: UserUpdateRequest =
    {
      nickname: this.userForm.get('nickname')?.value ?? "",
      file: file ?? null,
    }
    this.userService.updateAccountInfo(userUpdateRequest).subscribe(
      response => this.canLeaveValue = true
    );

    this.canLeaveValue = true

    this.router.navigate(['/']);
  }

  onUnsubscribe(id: string) {
    if (this.user) {
      this.user.subscribedTo = this.user.subscribedTo.filter(fc => fc.id !== id);
    }
  }
}
