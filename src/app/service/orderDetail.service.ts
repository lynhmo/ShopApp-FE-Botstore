import { Injectable } from '@angular/core';
import { environment } from '../env/enviroment';
import { HttpClient } from '@angular/common/http';
import { OrderDetail } from '../model/OrderDetail';
import { PageableResponse } from '../model/PageableResponse';
import { map, Observable } from 'rxjs';
import { UpdateOrderDetails } from '../model/UpdateOrderDetails';
import { SuccessResponse } from '../response/SuccessResponse';


@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private apiOrderDetail = `${environment.apiBaseUrl}/order-details`;

  constructor(
    private http: HttpClient,
  ) { }


  getAllOrderDetails(orderId: number) {
    return this.http.get<PageableResponse<OrderDetail>>(this.apiOrderDetail + "/order/" + orderId);
  }


  updateOrderDetails(orderId: number, updateProduct: UpdateOrderDetails) {
    return this.http.put<OrderDetail>(this.apiOrderDetail + "/" + orderId, updateProduct);
  }

  getProductNumberInOrder(orderId: number): Observable<number> {
    return this.getAllOrderDetails(orderId).pipe(
      map(value => value.totalElements) // Extract totalElements
    );
  }


  deleteOneOrderDetail(orderDetailId: number) {
    return this.http.delete<SuccessResponse>(this.apiOrderDetail + "/" + orderDetailId);
  }

  deleteAllOrderDetails(orderId: number) {
    return this.http.delete<SuccessResponse>(this.apiOrderDetail + "/order/" + orderId);
  }
}
