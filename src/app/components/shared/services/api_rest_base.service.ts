import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRestBase {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  get<T>(url: string) {
    const options = this.generateHeader();
    return this.http.get<T>(`${environment.basePath}${url}`, options);
  }

  post<T>(url: string, data: any) {
    const options = this.generateHeader();
    return this.http.post<T>(`${environment.basePath}${url}`, data, options);
  }

  put<T>(url: string, data: any) {
    const options = this.generateHeader();
    return this.http.put<T>(`${environment.basePath}${url}`, data, options);
  }

  delete<T>(url: string) {
    const options = this.generateHeader();
    return this.http.delete<T>(`${environment.basePath}${url}`, options);
  }

  recovery<T>(url: string, token: string, password: string) {
    const options = {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
      })
    };
    return this.http.post<T>(`${environment.basePath}${url}/${password}`, {}, options);
  }

  private generateHeader(contentType: any = "application/json") {
    let httpOptions = {};
    if (localStorage.getItem("token")) {
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": contentType,
          // "Access-Control-Allow-Origin": "*",
          Authorization: JSON.parse(localStorage.getItem("token")!),
        }),
      };
    } else {
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": contentType,
          // "Access-Control-Allow-Origin": "*",
        }),
      };
    }
    return httpOptions;
  }

}