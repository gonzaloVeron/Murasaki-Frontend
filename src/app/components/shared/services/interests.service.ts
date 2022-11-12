import { Injectable } from '@angular/core';
import { ApiRestBase } from './api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  constructor(private apiRestBase: ApiRestBase) { }

  find(searchText: string, page: number, size: number){
    return this.apiRestBase.get(`/interest/jwt/find/${searchText}?page=${page}&size=${size}`);
  }

  findAll(page: number, size: number){
    return this.apiRestBase.get(`/interest/jwt/find?page=${page}&size=${size}`);
  }

  create(data: any){
    return this.apiRestBase.post("/interest/jwt", data);
  }

  delete(id: number){
    return this.apiRestBase.delete(`/interest/jwt/${id}`);
  }

}
