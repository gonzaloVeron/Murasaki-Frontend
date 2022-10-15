import { Injectable } from '@angular/core';
import { ApiRestBase } from '../../shared/services/api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentFormService {

  constructor(private apiRestBase: ApiRestBase) { }

  getAllTeachers(){
    return this.apiRestBase.get("/teacher");
  }

  getStudentById(id: number){
    return this.apiRestBase.get(`/student/${id}`);
  }

  getAllInterests(){
    return this.apiRestBase.get("/interest");
  }

  save(data: any){
    return this.apiRestBase.post("/student", data);
  }

  update(id: number, data: any){
    return this.apiRestBase.put(`/student/${id}`, data);
  }

}
