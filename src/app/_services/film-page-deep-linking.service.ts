import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilmPageDeepLinkingService {

  constructor(private route: ActivatedRoute, private router: Router) { }

  getFilmId() {
    return this.route.snapshot.paramMap.get('filmId')
  }
}
