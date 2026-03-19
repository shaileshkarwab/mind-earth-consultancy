import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { ApiResponse } from '../../../models';
import { HttpService } from '../../../services';
import { UrlConstants } from '../../../constants/url-constants';
import { LeftMenu } from '../models/left-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }
  private leftNavBar$?: Observable<ApiResponse<Array<LeftMenu>>>;
  httpService = inject(HttpService)

  getLeftNavBar(): Observable<ApiResponse<Array<LeftMenu>>> {
    if (!this.leftNavBar$) {
      this.leftNavBar$ = this.httpService
        .get(UrlConstants.GET_ADMIN_MENU)
        .pipe(
          map(res => res ?? null),   // null safety
          shareReplay(1)
        );
    }

    return this.leftNavBar$;
  }
}
