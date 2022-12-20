import { Component, OnInit } from '@angular/core';
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

  schedules: ScheduleDTO;

  constructor(
    private sidebarService: SidebarService,
    private scheduleService: WeeklySchedulesService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.sidebarService.changeTitle("Calendario de horarios");
    this.scheduleService.getSchedules().subscribe({
      next: (response: ScheduleDTO) => {
        console.log(response);
        this.schedules = response;
      },
      error: (errorResponse: any) => {
        this.errorHandlerService.handle(errorResponse);
      }
    })
  }

}
