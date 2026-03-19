import { Injectable } from '@angular/core';
import { VerificationResponse } from '../model/verification-response';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  readonly AppKey: string = "MIND_EARTH";
  saveToken(verifiedResponse: VerificationResponse) {
    window.sessionStorage.setItem(this.AppKey, JSON.stringify(verifiedResponse));
  }

  getToken(): string {
    let token = JSON.parse(window.sessionStorage.getItem(this.AppKey)!) as VerificationResponse;
    if (token) {
      return token.token!;
    }
    else {
      return '';
    }
  }

  getRefresToken(): string {
    let token = JSON.parse(window.sessionStorage.getItem(this.AppKey)!) as VerificationResponse;
    return token.refreshToken!;
  }

  remove() {
    window.sessionStorage.removeItem(this.AppKey);
  }
}
