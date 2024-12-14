import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../model/register';


const baseAuthUrl = 'http://localhost:2345/api/v1/users';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(baseAuthUrl + "/register", data);
  }


  login(data: any): Observable<any> {
    return this.http.post(baseAuthUrl + "/login", data);
  }
}
