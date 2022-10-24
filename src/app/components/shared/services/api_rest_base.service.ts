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
    let options = this.generateHeader();
    return this.http.get<T>(`${environment.basePath}${url}`, options);
  }

  post<T>(url: string, data: any) {
    let options = this.generateHeader();
    return this.http.post<T>(`${environment.basePath}${url}`, data, options);
  }

  put<T>(url: string, data: any) {
    let options = this.generateHeader();
    return this.http.put<T>(`${environment.basePath}${url}`, data, options);
  }

  delete<T>(url: string) {
    let options = this.generateHeader();
    return this.http.delete<T>(`${environment.basePath}${url}`, options);
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (response: any): Observable<T> => {
  //     if (response.error.status < 500) {
  //       this.toastService.displayError(response.error.message);
  //       return throwError(() => null);
  //     }
  //     else if (response.error.status >= 400) {
  //       this.toastService.displayError("Ha ocurrido un error. Consulte al administrador del sistema.");
  //       console.error(response.error.message);
  //       return throwError(() => null);
  //     }
  //     return throwError(() => new Error("a"));
  //   };
    // return (response: any): Observable<T> => {
    //   console.info('handle error', response.error);
    //   if (response.error.status < 500) {
    //     this.toastService.displayError(response.error.message);
    //   }
    //   else {
    //     this.toastService.displayError("Ha ocurrido un error. Consulte al administrador del sistema.");
    //     console.error(response.error.message);
    //   }
    // }
  // }

  handleErrorPosta(error: any) {
    console.info('handle error', error);
    if (error.status < 500) {
      this.toastService.displayError(error.message);
    }
    else {
      this.toastService.displayError("Ha ocurrido un error. Consulte al administrador del sistema.");
      console.error(error.message);
    }
  }

  private generateHeader(contentType: any = "application/json") {
    let httpOptions = {};
    if (localStorage.getItem("currentUser")) {
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": contentType,
          // "Access-Control-Allow-Origin": "*",
          Authorization: JSON.parse(localStorage.getItem("currentUser")!).token,
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