import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants/Constants';
import { UserParams } from '../helpers/userParams';
import { PaginationService } from './pagination.service';
import { UserResponse } from '../../Models/User/UserReponse';
import { AccountInfoResponse } from 'src/app/Models/User/accountInfoResponse';
import { UserUpdateRequest } from 'src/app/Models/User/userUpdateRequest';
import { objectToFormData } from '../helpers/formDataHelper';

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

  getAccountInfo() {
    return this.httpClient.get<AccountInfoResponse>(Constants.baseApiUrl + this.localUrl + "account");
  }

  updateAccountInfo(userUpdateRequest: UserUpdateRequest) {
    const formData = objectToFormData(userUpdateRequest);
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.httpClient.put<AccountInfoResponse>(Constants.baseApiUrl + this.localUrl, formData, options);
  }
}
