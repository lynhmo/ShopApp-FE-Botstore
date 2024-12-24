import { Injectable } from '@angular/core';
import { environment } from '../env/enviroment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from './http-utils.service';
import { TokenService } from '../jwt/token.service';
import { PayUrl } from '../response/pay-url';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiPayment = `${environment.apiBaseUrl}/payment`;

  constructor(
    private http: HttpClient,
    private httpUtilsService: HttpUtilsService,
    private tokenService: TokenService,
  ) { }


  momoPay(paymentType: string, money: number, orderId: number) {
    return this.http.post<PayUrl>(this.apiPayment + "/momo", {
      paymentType: paymentType,
      amount: money,
      orderId: orderId
    });
  }

}
