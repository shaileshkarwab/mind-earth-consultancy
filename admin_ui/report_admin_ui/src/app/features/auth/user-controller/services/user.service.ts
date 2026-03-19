import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../models';
import { HttpService } from '../../../../services';
import { DtoManageUser } from '../models/dto-manage-user';
import { UrlConstants } from '../../../../constants/url-constants';
import { DtoUserList } from '../models/dto-user-list';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  httpService = inject(HttpService);
  createUser(user: DtoManageUser): Observable<ApiResponse<string>> {
    return this.httpService.post(UrlConstants.CREATE_USER, user);
  }

  getUsers(): Observable<ApiResponse<Array<DtoUserList>>> {
    return this.httpService.get(UrlConstants.GET_ALL_USERS);
  }

  getUserById(userId: string): Observable<ApiResponse<Array<DtoUserList>>> {
    return this.httpService.get(`${UrlConstants.GET_USER_BY_ID}/${userId}`);
  }

  deleteUser(userId: string): Observable<ApiResponse<boolean>> {
    return this.httpService.delete(`${UrlConstants.DELETE_USER_BY_ID}/${userId}`);
  }
}
