import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants/Constants';
import { SubscribeAddRequest } from '../../Models/Subscription/subscribeAddRequest';
import { SubscribeResponse } from '../../Models/Subscription/subscribeResponse';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private localUrl: string = 'subscriptions/';

  constructor(private httpClient: HttpClient) { }

  isSubscribed(filmId: string) {
    return this.httpClient.get<boolean>(Constants.baseApiUrl + this.localUrl + filmId);
  }

  subscribeToFilm(subscribeAddRequest: SubscribeAddRequest) {
    return this.httpClient.post<SubscribeResponse>(Constants.baseApiUrl + this.localUrl + "subscribe", subscribeAddRequest);
  }

  unsubscribe(filmId: string) {
    return this.httpClient.delete(Constants.baseApiUrl + this.localUrl + "unsubscribe/" + filmId);
  }
}
