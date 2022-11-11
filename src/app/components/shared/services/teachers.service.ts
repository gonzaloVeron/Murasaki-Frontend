import { Injectable } from '@angular/core';
import { ApiRestBase } from '../../student-form/api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private apiRestBase: ApiRestBase) { }

  getAllTeachers(){
    return this.apiRestBase.get("/teacher");
  }

  find(searchText: string, page: number, size: number){
    return this.apiRestBase.get(`/teacher/find/${searchText}?page=${page}&size=${size}`);
  }
  
  delete(id: number){
    return this.apiRestBase.delete(`/teacher/${id}`);
  }

  save(data: any){
    return this.apiRestBase.post("/user/register", data);
  }

  update(id: number, data: any){
    return this.apiRestBase.put(`/teacher/${id}`, data);
  }

  getTeacherById(id: number){
    return this.apiRestBase.get(`/teacher/${id}`);
  }

  getUserTeacherById(id: number){
    return this.apiRestBase.get(`/user/getByTeacherId/${id}`);
  }

}
