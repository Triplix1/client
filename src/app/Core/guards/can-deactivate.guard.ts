import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivate, CanDeactivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canLeave(): boolean;
}
@Injectable({
  providedIn: "root"
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (component.canLeave()) {
      return true;
    }
    else {
      return confirm("Do you want to discard changes?");
    }
  }
}
