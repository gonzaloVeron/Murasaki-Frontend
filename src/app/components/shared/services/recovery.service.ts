import { Injectable } from '@angular/core';
import { ApiRestBase } from './api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  constructor(private apiRestBase: ApiRestBase) { }

  sendRecoveryMail(email: string){
    return this.apiRestBase.post(`/user/recovery/${email}`, {});
  }

  changePasswordInApp(password: string){
    return this.apiRestBase.post(`/user/jwt/changePass/${password}`, {});
  }

  changePassword(token: string, password: string){
    return this.apiRestBase.recovery("/user/jwt/changePass", token, password);
  }

}
