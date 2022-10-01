import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  getAllStudents(){
    return this.http.get("http://localhost:8080/api/v1/student");
  }

  findStudents(searchText: string){
    return this.http.get("http://localhost:8080/api/v1/student");
  }

}
