import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { SidebarService } from '../shared/services/sidebar.service';
import { StudentsService } from '../shared/services/students.service';
import { TeachersService } from '../shared/services/teachers.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-transfer-students',
  templateUrl: './transfer-students.component.html',
  styleUrls: ['./transfer-students.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransferStudentsComponent implements OnInit {

  source_id: number;
  source_name: string = "";
  source_students: any[];

  target_id: number;
  target_name: string = "";
  target_students: any[];

  isLoading: boolean = false;

  constructor(
    private routeSnapshot: ActivatedRoute,
    private teacherService: TeachersService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private toastService: ToastService,
    private studentService: StudentsService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.sidebarService.changeTitle("Transferencia de alumnos");
    this.routeSnapshot.paramMap.subscribe({
      next: (paramsAsMap: any) => {
        this.source_id = parseInt(paramsAsMap.params["idSource"]);
        this.target_id = parseInt(paramsAsMap.params["idTarget"]);
        this.teacherService.getTeacherById(this.source_id).subscribe({
          next: (response: any) => {
            console.log(response);
            this.source_name = 'Alumnos de ' + response.name;
            this.source_students = response.students;
          },
          error: (responseError: any) => {
            this.errorHandlerService.handle(responseError);
          }
        });
        this.teacherService.getTeacherById(this.target_id).subscribe({
          next: (response: any) => {
            console.log(response);
            this.target_name = 'Alumnos de ' + response.name;
            this.target_students = response.students;
          },
          error: (responseError: any) => {
            this.errorHandlerService.handle(responseError);
          }
        });
      },
      error: (err: any) => {
        console.error("Hubo un error al obtener la id de la url");
      }
    });
  }

  accept(){
    this.isLoading = true;
    console.log("source: ", this.source_students.map(student => student.id));
    console.log("target: ", this.target_students.map(student => student.id));
    this.studentService.traslateStudents(
      this.source_id, 
      this.target_id, 
      { 
        sourceIds: this.source_students.map(student => student.id), 
        targetIds: this.target_students.map(student => student.id)
      }
    ).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.toastService.displaySuccess("Alumnos transferidos correctamente.");
        this.router.navigate(['app', 'sidebar', 'teachers'])
      },
      error: (responseError: any) => {
        this.isLoading = false;
        this.errorHandlerService.handle(responseError);
      }
    });
  }

}