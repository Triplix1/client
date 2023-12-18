import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RatingResponse } from '../../Models/Rating/RatingResponse';
import { RatingRequest } from '../../Models/Rating/RatingRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  localUrl = "ratings/";

  constructor(private httpClient: HttpClient) { }

  getFilmRate(filmId: string) {
    return this.httpClient.get<number>(environment.baseApiUrl + this.localUrl + filmId);
  }

  getUserFilmRating(filmId: string) {
    return this.httpClient.get<RatingResponse>(environment.baseApiUrl + this.localUrl + "user-rate/" + filmId);
  }

  rateFilm(rating: RatingRequest) {
    return this.httpClient.post<RatingResponse>(environment.baseApiUrl + this.localUrl, rating);
  }
}
