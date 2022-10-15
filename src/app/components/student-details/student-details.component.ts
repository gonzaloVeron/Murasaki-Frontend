import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { ToastService } from '../shared/services/toast.service';
import { StudentDetailsService } from './services/student-details.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  student: any;

  lessons: any[] = [];

  constructor(private routeSnapshot: ActivatedRoute, private studentDetailService: StudentDetailsService) { }

  ngOnInit() {
    this.routeSnapshot.paramMap.subscribe({
      next: (paramsAsMap: any) => {
        this.studentDetailService.getStudentById(paramsAsMap.params["id"]).subscribe({
          next: (resp: any) => {
            console.log(resp);
            this.lessons = resp.lessons.map((elem: any) => { return { status: 'Clase', date: elem.date, content: elem.content, icon: PrimeIcons.BOOK, color: '#59558f' } });
            this.student = resp;
          },
          error: (resp: any) => {
            console.error(resp);
          }
        })
      },
      error: (err: any) => {
        console.log(err);
      }
    });

  }

}
