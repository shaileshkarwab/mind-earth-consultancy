import { inject, Injectable } from '@angular/core';
import { VerificationRequest } from '../model/verification-request';
import { HttpService } from '../../../services';
import { UrlConstants } from '../../../constants/url-constants';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../models';
import { VerificationResponse } from '../model/verification-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  genericHTTPService = inject(HttpService);
  verifyUser(verificationRequest:VerificationRequest):Observable<ApiResponse<VerificationResponse>>{
    return this.genericHTTPService.post(UrlConstants.AUTH,verificationRequest);
  }

  logout(refreshToken:string):Observable<ApiResponse<boolean>>
  {
    return this.genericHTTPService.post(`${UrlConstants.AUTH}/${refreshToken}`,{});
  }
}
