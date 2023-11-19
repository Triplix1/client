import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../Constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  localUrl = 'genres/'

  constructor(private httpClient: HttpClient) { }

  getGenreNamesList() {
    return this.httpClient.get<string[]>(Constants.baseApiUrl + this.localUrl + "names");
  }
}
