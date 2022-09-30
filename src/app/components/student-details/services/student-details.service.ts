import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {

  constructor(private http: HttpClient) { }

  getStudentById(id: number){
    return this.http.get(`http://localhost:8080/api/v1/student/${id}`);
  }

}
