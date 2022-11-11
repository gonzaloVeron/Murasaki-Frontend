import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ApiRestBase } from './api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentFormService {

  constructor(private apiRestBase: ApiRestBase) { }

  getAllTeachers(){
    return this.apiRestBase.get("/teacher");
  }

  getStudentById(id: number){
    return this.apiRestBase.get(`/student/jwt/${id}`);
  }

  getAllInterests(){
    return this.apiRestBase.get("/interest/jwt");
  }

  save(data: any){
    return this.apiRestBase.post("/student/jwt", data);
  }

  update(id: number, data: any){
    return this.apiRestBase.put(`/student/jwt/${id}`, data);
  }

}
