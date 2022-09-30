import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { StudentDetailsService } from './services/student-details.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  student: any;

  constructor(private routeSnapshot: ActivatedRoute, private studentDetailService: StudentDetailsService) { }

  ngOnInit() {
    this.routeSnapshot.paramMap.subscribe({
      next: (paramsAsMap: any) => {
        // console.log(paramsAsMap.params["id"]);
        this.studentDetailService.getStudentById(paramsAsMap.params["id"]).subscribe({
          next: (resp: any) => {
            console.log(resp);
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
