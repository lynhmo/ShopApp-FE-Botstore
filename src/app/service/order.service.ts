import { Injectable } from '@angular/core';
import { environment } from '../env/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order } from '../model/Order';
import { PageableResponse } from '../model/PageableResponse';
import { map, Observable } from 'rxjs';
import { SuccessResponse } from '../response/SuccessResponse';
import { OrderResponse } from '../response/OrderResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiOrder = `${environment.apiBaseUrl}/orders`;

  constructor(
    private http: HttpClient
  ) { }


  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiOrder + "/all-orders");
  }



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


  updateOrderStatus(orderId: number, userId: number, orderStatus: string): Observable<SuccessResponse> {
    let body = {
      orderId: orderId.toString(),
      userId: userId.toString(),
      orderStatus: orderStatus
    }

    return this.http.put<SuccessResponse>(this.apiOrder + "/status", body);
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


  getAllOrdersByUserId(userId: number): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.apiOrder + "/user/detail/" + userId);
  }
}
