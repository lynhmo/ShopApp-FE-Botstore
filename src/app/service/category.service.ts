import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../env/enviroment';
import { Category } from '../model/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private apiProduct = `${environment.apiBaseUrl}/categories`;


  constructor(
    private http: HttpClient,
  ) { }


  getCategory(categoryID: number): Observable<Category> {
    return this.http.get<Category>(this.apiProduct + "/" + categoryID);
  }
}
