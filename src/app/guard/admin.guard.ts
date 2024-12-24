import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../jwt/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(): boolean {
    if (this.tokenService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
