
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const PaymentGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isPaymentCompleted = sessionStorage.getItem('payment-status');

  if (isPaymentCompleted == null || isPaymentCompleted == 'true') {
    router.navigate(['/order-success']);
    return false; // Ngăn điều hướng đến trang Payment
  }

  return true;
};
