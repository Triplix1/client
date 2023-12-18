import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscribeAddRequest } from '../../Models/Subscription/subscribeAddRequest';
import { SubscribeResponse } from '../../Models/Subscription/subscribeResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private localUrl: string = 'subscriptions/';

  constructor(private httpClient: HttpClient) { }

  isSubscribed(filmId: string) {
    return this.httpClient.get<boolean>(environment.baseApiUrl + this.localUrl + filmId);
  }

  subscribeToFilm(subscribeAddRequest: SubscribeAddRequest) {
    return this.httpClient.post<SubscribeResponse>(environment.baseApiUrl + this.localUrl + "subscribe", subscribeAddRequest);
  }

  unsubscribe(filmId: string) {
    return this.httpClient.delete(environment.baseApiUrl + this.localUrl + "unsubscribe/" + filmId);
  }
}
