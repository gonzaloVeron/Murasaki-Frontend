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

  getStudentById(id: number) {
    return this.apiRestBase.get(`/student/jwt/${id}`);
  }

  deleteLessonById(student_id: number, lesson_id: number) {
    return this.apiRestBase.put(`/student/jwt/${student_id}/${lesson_id}`, {});
  }

  addLesson(student_id: number, data: any) {
    return this.apiRestBase.post(`/student/jwt/addLesson/${student_id}`, data);
  }

  updateLesson(lesson_id: number, data: any) {
    return this.apiRestBase.put(`/lesson/jwt/${lesson_id}`, data);
  }

}
