import { Injectable } from '@angular/core';
import { environment } from '../env/enviroment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from './http-utils.service';
import { OrderDetail } from '../model/OrderDetail';
import { PageableResponse } from '../model/PageableResponse';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { ProductService } from './product.service';
import { OrderDetailProduct } from '../model/OrderDetailProduct';
import { UpdateOrderDetails } from '../model/UpdateOrderDetails';


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

}
