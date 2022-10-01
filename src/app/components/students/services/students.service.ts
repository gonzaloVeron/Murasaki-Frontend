import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  path: string = `${environment.basePath}/student`;

  constructor(private http: HttpClient) { }

  getAllStudents(){ 
    return this.http.get(`${this.path}`);
  }

  findStudentsByLevel(dto: any){
    return this.http.post(`${this.path}/searchByLevel`, dto);
    
  }

  findStudentsByTeacher(dto: any){
    return this.http.post(`${this.path}/searchByTeacherName`, dto);
  }

}
