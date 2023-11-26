import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants/Constants';
import { UserParams } from '../helpers/userParams';
import { PaginationService } from './pagination.service';
import { UserResponse } from '../../Models/User/UserReponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  localUrl = 'users/';

  constructor(private httpClient: HttpClient, private paginationService: PaginationService) { }

  getAdmins(userParams: UserParams) {
    let params = this.getUserHeaders(userParams);
    return this.paginationService.getPaginatedResult<UserResponse[]>(Constants.baseApiUrl + this.localUrl + 'admins', params, this.httpClient);
  }

  private getUserHeaders(userParams: UserParams) {
    let params = new HttpParams();

    params = this.paginationService.includePaginationHeaders(userParams, params);

    return params;
  }

  deleteAdmin(id: string) {
    return this.httpClient.delete(Constants.baseApiUrl + this.localUrl + id);
  }
}
