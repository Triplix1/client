import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private route: ActivatedRoute, private router: Router) { }

  loadSearchField() {
    return this.route.snapshot.queryParamMap.get('search');
  }
}
