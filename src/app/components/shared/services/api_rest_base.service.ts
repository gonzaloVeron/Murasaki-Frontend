import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRestBase {

    constructor(private http: HttpClient, private toastService: ToastService) { }
  
    get<T>(url: string){
      let options = this.generateHeader();
      return this.http.get<T>(`${environment.basePath}${url}`, options).pipe(
          catchError(this.handleError<T>("get"))
      )
    }
    
    post<T>(url: string, data: any){
      let options = this.generateHeader();
      return this.http.post<T>(`${environment.basePath}${url}`, data, options).pipe(
          catchError(this.handleError<T>("post"))
      );
    }

    put<T>(url: string, data: any){
      let options = this.generateHeader();
      return this.http.put<T>(`${environment.basePath}${url}`, data, options).pipe(
          catchError(this.handleError<T>("put"))
      );
    }

    delete<T>(url: string){
      let options = this.generateHeader();
      return this.http.delete<T>(`${environment.basePath}${url}`, options).pipe(
          catchError(this.handleError<T>("delete"))
      );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (response: any): Observable<T> => {
        switch(response.error.status){
          case 401:
            this.toastService.displayError(response.error.message);
            //logout
            break;
          default: 
            console.error(response.error.message);
            break;
        }
        return of(result as T);
      };
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
