import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleCard } from '../models/ScheduleCard';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnInit {

  @Input('schedule') schedule: ScheduleCard;
  @Output('onDelete') onDelete: EventEmitter<ScheduleCard> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  emit(){
    this.onDelete.emit(this.schedule);
  }

}
