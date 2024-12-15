import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { Observable } from 'rxjs';
import { environment } from '../env/enviroment';
import { PageableResponse } from '../model/PageableResponse';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiProduct = `${environment.apiBaseUrl}/products`;
  constructor(
    private http: HttpClient,
    private httpUtilsService: HttpUtilsService,

  ) { }


  getAllPageable(page: number, size: number, disable?: number): Observable<PageableResponse<Product>> {
    // Build query parameters
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (disable) {
      params = params.set('disable', disable);
    }

    return this.http.get<PageableResponse<Product>>(this.apiProduct, { params });
  }

}
