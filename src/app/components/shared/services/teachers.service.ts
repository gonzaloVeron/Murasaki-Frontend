import { Injectable } from '@angular/core';
import { ApiRestBase } from './api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private apiRestBase: ApiRestBase) { }

  getAllTeachers(){
    return this.apiRestBase.get("/teacher/jwt");
  }

  find(searchText: string, page: number, size: number){
    return this.apiRestBase.get(`/teacher/jwt/find/${searchText}?page=${page}&size=${size}`);
  }
  
  delete(id: number){
    return this.apiRestBase.delete(`/teacher/jwt/${id}`);
  }

  save(data: any){
    return this.apiRestBase.post("/user/register", data);
  }

  update(id: number, data: any){
    return this.apiRestBase.put(`/teacher/jwt/${id}`, data);
  }

  getTeacherById(id: number){
    return this.apiRestBase.get(`/teacher/jwt/${id}`);
  }

  getUserTeacherById(id: number){
    return this.apiRestBase.get(`/user/getByTeacherId/${id}`);
  }

  getActualTeacher(){
    return this.apiRestBase.get(`/teacher/jwt/actual`);
  }

}
