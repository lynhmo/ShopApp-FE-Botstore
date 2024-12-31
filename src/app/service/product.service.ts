import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { environment } from '../env/enviroment';
import { PageableResponse } from '../model/PageableResponse';
import { Product } from '../model/product.model';
import { OrderDetailService } from './orderDetail.service';
import { ProductRequest } from '../model/ProductRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiProduct = `${environment.apiBaseUrl}/products`;
  constructor(
    private http: HttpClient,
    private orderDetailService: OrderDetailService,
  ) { }


  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(this.apiProduct + "/" + productId);
  }

  getAllProductsFromOrder(orderId: number): Observable<Product[]> {

    return this.orderDetailService.getAllOrderDetails(orderId).pipe(
      // Step 1: Extract the content (list of OrderDetails)
      map((response) => response.content),
      // Step 2: For each orderDetail, fetch the product info
      mergeMap((orderDetails) => {
        const productRequests = orderDetails.map((detail) =>
          this.getProduct(detail.product_id) // Fetch each product
        );
        // Step 3: Use forkJoin to wait for all product requests to complete
        return forkJoin(productRequests);
      })
    );
  }




  getAllPageable(page: number, size: number, disable?: number): Observable<PageableResponse<Product>> {
    // Build query parameters
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (disable) {
      params = params.set('disable', disable);
    }

    return this.http.get<PageableResponse<Product>>(this.apiProduct, { params }).pipe(
      map(response => {
        // Convert byte array to base64 string for each product thumbnail
        response.content.forEach(product => {
          if (product.thumbnail && !product.thumbnail.startsWith('data:image')) {
            product.thumbnail = `data:image/jpeg;base64,${product.thumbnail}`;
          }
        });
        return response;
      })
    );
  }



  saveProduct(product: any): Observable<Product> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<Product>(this.apiProduct + "/v2", product, { headers });
  }
}
