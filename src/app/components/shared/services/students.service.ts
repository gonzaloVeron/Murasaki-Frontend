import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiRestBase } from './api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  path: string = `${environment.basePath}/student`;

  constructor(private apiRestBase: ApiRestBase) { }

  getAllStudents(){ 
    return this.apiRestBase.get("/student/jwt");
  }

  find(searchText: string, page: number, size: number){
    return this.apiRestBase.get(`/student/jwt/find/${searchText}?page=${page}&size=${size}`);
  }
  
  delete(id: number){
    return this.apiRestBase.delete(`/student/jwt/${id}`);
  }

  addLesson(student_id: number, data: any){
    return this.apiRestBase.post(`/student/jwt/addLesson/${student_id}`, data);
  }

}
