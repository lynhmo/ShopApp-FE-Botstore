import { Injectable } from '@angular/core';
import { environment } from '../env/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpUtilsService } from './http-utils.service';
import { Order } from '../model/Order';
import { PageableResponse } from '../model/PageableResponse';
import { map, Observable } from 'rxjs';
import { TokenService } from '../jwt/token.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiOrder = `${environment.apiBaseUrl}/orders`;
  pendingOrderId!: number
  constructor(
    private http: HttpClient,
    private httpUtilsService: HttpUtilsService,
    private tokenService: TokenService,
  ) { }

  getAllPageable(page: number, size: number, userId: number): Observable<PageableResponse<Order>> {
    // Build query parameters
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageableResponse<Order>>(this.apiOrder + "/user/" + userId, { params });
  }


  getOrderById(orderId: Number): Observable<Order> {
    return this.http.get<Order>(this.apiOrder + "/" + orderId);
  }



  getPendingOrderIds(userId: number): Observable<number[]> {
    return this.getAllPageable(0, 100, userId).pipe(
      map(response =>
        response.content
          .filter(order => order.status === 'pending') // Filter pending orders
          .map(order => order.id) // Extract the id property
      )
    );
  }

}
