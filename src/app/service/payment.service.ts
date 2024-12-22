import { Injectable } from '@angular/core';
import { environment } from '../env/enviroment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from './http-utils.service';
import { TokenService } from '../jwt/token.service';

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

  
}
