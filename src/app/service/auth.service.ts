import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/enviroment';


// const baseAuthUrl = 'http://localhost:2345/api/v1/users';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private baseAuthUrl = `${environment.apiBaseUrl}/users`;



  register(data: any): Observable<any> {
    return this.http.post(this.baseAuthUrl + "/register", data);
  }


  login(data: any): Observable<any> {
    return this.http.post(this.baseAuthUrl + "/login", data);
  }
}
