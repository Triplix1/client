import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../Constants/Constants';
import { SubscribeAddRequest } from '../Dto/Subscription/SubscribeAddRequest';
import { SubscribeResponse } from '../Dto/Subscription/SubscribeResponse';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private localUrl: string = 'subscriptions/';

  constructor(private httpClient: HttpClient) { }

  isSubscribed(filmId: string) {
    return this.httpClient.get<boolean>(Constants.baseApiUrl + this.localUrl + filmId);
  }

  subscribe(subscribeAddRequest: SubscribeAddRequest) {
    return this.httpClient.post<SubscribeResponse>(Constants.baseApiUrl + this.localUrl + "subscribe", subscribeAddRequest);
  }

  unsubscribe(filmId: string) {
    return this.httpClient.delete(Constants.baseApiUrl + this.localUrl + "unsubscribe/" + filmId);
  }
}
