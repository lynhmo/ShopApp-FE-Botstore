import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService); // Inject TokenService
  const router = inject(Router); // Inject Router

  if (tokenService.isTokenExpired()) {
    localStorage.clear();
    router.navigate(['']); // Redirect to home if token is expired
    return false;
  }

  return true; // Allow navigation if token is valid
};
