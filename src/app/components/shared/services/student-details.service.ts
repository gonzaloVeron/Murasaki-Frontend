import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRestBase } from './api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {

  constructor(private apiRestBase: ApiRestBase) { }

  // getStudentById(id: number){
  //   return this.http.get(`http://localhost:8080/api/v1/student/jwt/${id}`);
  // }

  getStudentById(id: number){
    return this.apiRestBase.get(`/student/jwt/${id}`);
  }

}
