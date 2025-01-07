import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../env/enviroment';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../response/SuccessResponse';

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

  addCategory(categoryName: string): Observable<Category> {
    const body = {
      name: categoryName
    }
    return this.http.post<Category>(this.apiCategory, body)
  }


  deleteCategory(categoryID: number): Observable<SuccessResponse> {
    return this.http.delete<SuccessResponse>(this.apiCategory + "/" + categoryID)
  }


  updateCategory(id: number, _name: string): Observable<SuccessResponse> {
    const body = {
      name: _name
    }
    return this.http.put<SuccessResponse>(this.apiCategory + "/" + id, body)
  }
}
