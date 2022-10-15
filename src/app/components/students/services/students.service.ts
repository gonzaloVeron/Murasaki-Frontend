import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiRestBase } from '../../shared/services/api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  path: string = `${environment.basePath}/student`;

  constructor(private apiRestBase: ApiRestBase) { }

  getAllStudents(){ 
    return this.apiRestBase.get("/student");
  }

  find(searchText: string, page: number, size: number){
    return this.apiRestBase.get(`/student/find/${searchText}?page=${page}&size=${size}`);
  }
  
  delete(id: number){
    return this.apiRestBase.delete(`/student/${id}`);
  }
}
