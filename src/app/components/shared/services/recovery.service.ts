import { Injectable } from '@angular/core';
import { ApiRestBase } from '../../student-form/api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  constructor(private apiRestBase: ApiRestBase) { }

  sendRecoveryMail(email: string){
    return this.apiRestBase.post(`/user/recovery/${email}`, {});
  }

  changePassword(token: string, password: string){
    return this.apiRestBase.recovery("/user/jwt/changePass", token, password);
  }

}
