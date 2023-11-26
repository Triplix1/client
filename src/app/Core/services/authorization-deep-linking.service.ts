import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationDeepLinkingService {

  constructor(private route: ActivatedRoute) { }

  getReturnUrl() {
    return this.route.snapshot.queryParams['returnUrl'] ?? '/';
  }

  getIsAdmin() {
    return this.route.snapshot.queryParams['admin'] ?? false
  }
}
