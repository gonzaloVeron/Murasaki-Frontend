import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { ToastService } from '../shared/services/toast.service';
import { StudentDetailsService } from '../shared/services/student-details.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentDetailsComponent implements OnInit {

  student: any;

  lessons: any[] = [];

  constructor(private routeSnapshot: ActivatedRoute, private studentDetailService: StudentDetailsService, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.routeSnapshot.paramMap.subscribe({
      next: (paramsAsMap: any) => {
        this.studentDetailService.getStudentById(paramsAsMap.params["id"]).subscribe({
          next: (resp: any) => {
            this.lessons = resp.lessons.map((elem: any) => { return { status: 'Clase', date: elem.date, content: elem.content, icon: PrimeIcons.BOOK, color: '#59558f', links: elem.links } });
            this.student = resp;
          },
          error: (responseError: any) => {
            this.errorHandlerService.handle(responseError);
          }
        })
      },
      error: (err: any) => {

      }
    });

  }

}
