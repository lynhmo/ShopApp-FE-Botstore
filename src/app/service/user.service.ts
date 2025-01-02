import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { environment } from '../env/enviroment';
import { UserResponse } from '../model/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUserDetail = `${environment.apiBaseUrl}/users`;
  localStorage?: Storage;

  constructor(
    private http: HttpClient,
    private httpUtilsService: HttpUtilsService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }


  getUserById(id: number) {
    return this.http.get<UserResponse>(this.apiUserDetail + '/user-details/' + id);
  }

  getAllUser() {
    return this.http.get<UserResponse[]>(this.apiUserDetail + '/all');
  }


  editUser(user: any) {
    return this.http.put<UserResponse>(this.apiUserDetail + '/' + user.id, user);
  }

  editUser_V2(user: UserResponse) {
    return this.http.put<UserResponse>(this.apiUserDetail + '/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.apiUserDetail + '/' + id);
  }

}
