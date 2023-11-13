import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser = this.accountService.currentUser$;

  constructor(private accountService: AccountService) { }
  logOut() {
    this.accountService.logout();
  }
}
