import { Injectable } from '@angular/core';
import { ApiRestBase } from 'src/app/components/shared/services/api_rest_base.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiRestBase: ApiRestBase) { }

  authenticate(credentials: any){
    return this.apiRestBase.post("/user/login", credentials);
  }

}
