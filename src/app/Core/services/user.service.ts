import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserParams } from '../helpers/userParams';
import { PaginationService } from './pagination.service';
import { UserResponse } from '../../Models/User/UserReponse';
import { AccountInfoResponse } from 'src/app/Models/User/accountInfoResponse';
import { UserUpdateRequest } from 'src/app/Models/User/userUpdateRequest';
import { objectToFormData } from '../helpers/formDataHelper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  localUrl = 'users/';

  constructor(private httpClient: HttpClient, private paginationService: PaginationService) { }

  getAdmins(userParams: UserParams) {
    let params = this.getUserHeaders(userParams);
    return this.paginationService.getPaginatedResult<UserResponse[]>(environment.baseApiUrl + this.localUrl + 'admins', params, this.httpClient);
  }

  private getUserHeaders(userParams: UserParams) {
    let params = new HttpParams();

    params = this.paginationService.includePaginationHeaders(userParams, params);

    return params;
  }

  deleteAdmin(id: string) {
    return this.httpClient.delete(environment.baseApiUrl + this.localUrl + id);
  }

  getAccountInfo() {
    return this.httpClient.get<AccountInfoResponse>(environment.baseApiUrl + this.localUrl + "account");
  }

  updateAccountInfo(userUpdateRequest: UserUpdateRequest) {
    const formData = objectToFormData(userUpdateRequest);
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.httpClient.put<AccountInfoResponse>(environment.baseApiUrl + this.localUrl, formData, options);
  }
}
