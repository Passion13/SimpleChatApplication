import { Injectable, Inject } from "@angular/core";
import {  Response, Http } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenResponse } from '../employee/tokenResponse.model';


@Injectable()
export class AuthenticationService
{
  

  appUrl: string = "";
  constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.appUrl = baseUrl;
  }
  getAuthenticate(employee) {
    return this._http.post(this.appUrl + 'api/Employee/Login', employee)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  logout(id) {
    return this._http.get(this.appUrl + 'api/Employee/Logout/' + id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  saveMessage(employeeMessage) {
    return this._http.post(this.appUrl + 'api/Employee/SaveMessage', employeeMessage)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  getEmployees(id) {
    return this._http.get(this.appUrl + 'api/Employee/Index/'+id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);

  }
  getEmployeeMessages(senderId,receiverId) {
    return this._http.get(this.appUrl + 'api/Employee/Message?senderId=' + senderId + '&&receiverId=' + receiverId)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);

  }
  errorHandler(error: Response) {
 
    return Observable.throw(error);
  } 
}
