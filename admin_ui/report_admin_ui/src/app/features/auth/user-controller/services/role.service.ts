import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../models';
import { RoleList } from '../models/role-list';
import { HttpService } from '../../../../services';
import { UrlConstants } from '../../../../constants/url-constants';
import { Filter } from '../../../../models/filter';
import { DtoMenu } from '../models/dto-menu';
import { DtoRole } from '../models/dto-role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }
  httpService = inject(HttpService);
  getActiveRoles(): Observable<ApiResponse<Array<RoleList>>> {
    return this.httpService.get(UrlConstants.GET_ACTIVE_ROLES);
  }

  getAllRoles(filter: Filter): Observable<ApiResponse<Array<RoleList>>> {
    return this.httpService.post(UrlConstants.GET_ROLE_LIST, filter);
  }

  getModuleAndModuleDetails(): Observable<ApiResponse<Array<DtoMenu>>> {
    return this.httpService.get(UrlConstants.GET_MENU_AND_MENU_DETAILS);
  }

  createRole(role: DtoRole): Observable<ApiResponse<string>> {
    return this.httpService.post(UrlConstants.CREATE_ROLE, role);
  }

  getRoleDataById(roleId:string):Observable<ApiResponse<DtoRole>>
  {
    return this.httpService.get(`${UrlConstants.GET_ROLE_BY_ID}/${roleId}`);
  }

  deleteRoleDataById(roleId:string):Observable<ApiResponse<boolean>>
  {
    return this.httpService.delete(`${UrlConstants.DELETE_ROLE_BY_ID}/${roleId}`);
  }
}
