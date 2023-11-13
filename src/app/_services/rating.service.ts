import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../Constants/Constants';
import { RatingResponse } from '../Dto/Rating/RatingResponse';
import { RatingRequest } from '../Dto/Rating/RatingRequest';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  localUrl = "ratings/";

  constructor(private httpClient: HttpClient) { }

  getFilmRate(filmId: string) {
    return this.httpClient.get<number>(Constants.baseApiUrl + this.localUrl + filmId);
  }

  getUserFilmRating(filmId: string) {
    return this.httpClient.get<RatingResponse>(Constants.baseApiUrl + this.localUrl + "user-rate/" + filmId);
  }

  rateFilm(rating: RatingRequest) {
    return this.httpClient.post<RatingResponse>(Constants.baseApiUrl + this.localUrl, rating);
  }
}
