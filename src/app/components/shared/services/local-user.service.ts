import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalUserService {

  constructor() { }

  saveUserData(data: any){
    localStorage.setItem("userName", JSON.stringify(data.teacherName));
    localStorage.setItem("token", JSON.stringify(data.token));
  }

  getUser(){
    return JSON.parse(localStorage.getItem("userName"));
  }

  getToken(){
    return JSON.parse(localStorage.getItem("token"));
  }

  removeUser(){
    localStorage.clear();
  }

}
