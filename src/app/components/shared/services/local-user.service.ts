import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalUserService {

  constructor() { }

  saveUserData(data: any): void {
    localStorage.setItem("userName", JSON.stringify(data.teacherName));
    localStorage.setItem("token", JSON.stringify(data.token));
  }

  getUser(): string {
    return JSON.parse(localStorage.getItem("userName"));
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem("token"));
  }

  removeUser(): void {
    localStorage.clear();
  }

}
