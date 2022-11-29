import { Injectable } from '@angular/core';
import { ApiRestBase } from './api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiRestBase: ApiRestBase) { }

  isFirstTimeInApp(){
    return this.apiRestBase.get("/user/jwt/needChangePass");
  }

}
