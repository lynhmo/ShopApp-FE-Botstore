import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'access_token';
  private jwtHelperService = new JwtHelperService();
  localStorage?: Storage;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }

  //getter/setter
  getToken(): string {
    return this.localStorage?.getItem(this.TOKEN_KEY) ?? '';
  }

  setToken(token: string): void {
    this.localStorage?.setItem(this.TOKEN_KEY, token);
  }



  getUserId(): number {
    let token = this.getToken();
    if (!token) {
      return 0;
    }
    let userObject = this.jwtHelperService.decodeToken(token);
    return 'id' in userObject ? parseInt(userObject['id']) : 0;
  }


  removeToken(): void {
    this.localStorage?.removeItem(this.TOKEN_KEY);
  }
  isTokenExpired(): boolean {
    if (this.getToken() == '') {
      return false;
    }
    return this.jwtHelperService.isTokenExpired(this.getToken()!);
  }

  isTokenExpiredV2(): boolean {
    const decodedToken = this.jwtHelperService.decodeToken(this.getToken());
    const exp = decodedToken.exp;
    if (exp == null || exp == '') {
      return false
    }
    const remainTime = exp - Math.floor(Date.now() / 1000)
    if (remainTime > 0) {
      return true
    }
    return false
  }
}
