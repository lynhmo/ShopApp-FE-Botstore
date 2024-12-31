import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../env/enviroment';
import { Category } from '../model/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private apiCategory = `${environment.apiBaseUrl}/categories`;


  constructor(
    private http: HttpClient,
  ) { }


  getCategory(categoryID: number): Observable<Category> {
    return this.http.get<Category>(this.apiCategory + "/" + categoryID);
  }

  getAllCategory(): Observable<Category[]> {
    let params = new HttpParams()
      .set('page', 0)
      .set('size', 100);

    return this.http.get<Category[]>(this.apiCategory, { params });
  }
}
