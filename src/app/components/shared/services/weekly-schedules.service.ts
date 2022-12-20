import { Injectable } from '@angular/core';
import { ApiRestBase } from './api_rest_base.service';

@Injectable({
  providedIn: 'root'
})
export class WeeklySchedulesService {

  constructor(private apiRestBase: ApiRestBase) { }

  getSchedules(){
    return this.apiRestBase.get("/teacher/jwt/schedules");
  }

}
