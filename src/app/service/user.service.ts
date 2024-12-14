import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { environment } from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
  localStorage?: Storage;

  constructor(
    private http: HttpClient,
    private httpUtilsService: HttpUtilsService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }

}
