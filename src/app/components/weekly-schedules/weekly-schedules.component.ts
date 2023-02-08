import { Component, OnInit } from '@angular/core';
import { Schedule } from '../shared/models/Schedule';
import { ScheduleDTO } from '../shared/models/ScheduleDTO';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { SidebarService } from '../shared/services/sidebar.service';
import { WeeklySchedulesService } from '../shared/services/weekly-schedules.service';

@Component({
  selector: 'app-weekly-schedules',
  templateUrl: './weekly-schedules.component.html',
  styleUrls: ['./weekly-schedules.component.scss']
})
export class WeeklySchedulesComponent implements OnInit {

  schedules: ScheduleDTO = new ScheduleDTO();

  constructor(
    private sidebarService: SidebarService,
    private scheduleService: WeeklySchedulesService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.sidebarService.changeTitle("Calendario de horarios");
    this.scheduleService.getSchedules().subscribe({
      next: (response: ScheduleDTO) => {
        this.schedules.lunes = response.lunes.map(elem => new Schedule(elem.time, elem.studentNames)).sort((a: Schedule, b: Schedule) => {
          return a.compareTo(b);
        });
        this.schedules.martes = response.martes.map(elem => new Schedule(elem.time, elem.studentNames)).sort((a: Schedule, b: Schedule) => {
          return a.compareTo(b);
        });
        this.schedules.miercoles = response.miercoles.map(elem => new Schedule(elem.time, elem.studentNames)).sort((a: Schedule, b: Schedule) => {
          return a.compareTo(b);
        });
        this.schedules.jueves = response.jueves.map(elem => new Schedule(elem.time, elem.studentNames)).sort((a: Schedule, b: Schedule) => {
          return a.compareTo(b);
        });
        this.schedules.viernes = response.viernes.map(elem => new Schedule(elem.time, elem.studentNames)).sort((a: Schedule, b: Schedule) => {
          return a.compareTo(b);
        });
        this.schedules.sabado = response.sabado.map(elem => new Schedule(elem.time, elem.studentNames)).sort((a: Schedule, b: Schedule) => {
          return a.compareTo(b);
        });
        this.schedules.domingo = response.domingo.map(elem => new Schedule(elem.time, elem.studentNames)).sort((a: Schedule, b: Schedule) => {
          return a.compareTo(b);
        });
      },
      error: (errorResponse: any) => {
        this.errorHandlerService.handle(errorResponse);
      }
    })
  }

}
