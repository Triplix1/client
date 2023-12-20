import { Component } from '@angular/core';
import { AccountService } from './Core/services/account.service';
import { User } from './Models/User/user';
import { bounceAnimation } from './Core/animations/route-change';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [bounceAnimation]
})
export class AppComponent {
  title = 'Relaxinema';
  animationState = 'routeEnter';

  constructor(private accountService: AccountService, private router: Router, private socialAuthService: SocialAuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
    ).subscribe(event => {
      this.animationState = event instanceof NavigationStart ? 'routeLeave' : 'routeEnter';
    });
  }

  ngOnInit(): void {
    this.setCurrentUser();
    this.socialAuthService.authState
      .subscribe((user: SocialUser) => {
        if (user) {
          this.accountService.externalLogin({ idToken: user.idToken, provider: user.provider }).subscribe();
          this.router.navigate(['/home'])
        }
      });
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  getState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute.snapshot.url[0].path : "";
  }
}
