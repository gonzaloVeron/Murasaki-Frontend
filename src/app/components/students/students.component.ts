import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from 'src/app/components/table/models/table-header';
import { ToastService } from '../shared/services/toast.service';
import { StudentsService } from './services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  loading: boolean = false;
  students: any[] = [];
  total: number = 0;
  limit: number = 5;
  headers: TableHeader[] = [
    { name: "Nombre", key: "name" },
    { name: "Nivel", key: "jlptLevel" },
    { name: "Profesor", key: "teacherDTO.name" },
    { name: "", key: "" },
  ];

  totalRecords: number = 0;
  page: number = 0;
  size: number = 5;
  searchText: string = "";

  /** Modal */
  studentToDestroy: any;
  displayDestroyStudentModal: boolean = false;
  modalButtonLoading: boolean = false;

  onSort(event: any){ //falta tipar
    console.log(event);
  }

  constructor(
    private studentsService: StudentsService, 
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.studentsService.find("", 0, 5).subscribe(
      (response: any) => { //falta tipar
        this.students = response.content;
        this.totalRecords = response.totalElements;
        console.log(response);
      }
    );
  }

  toStudentDetail(student: any){ //falta tipar
    this.router.navigate(["app", "sidebar", "student", student.id]);
  }

  onAdd(){
    this.router.navigate(["app", "sidebar", "student-form"]);
  }

  changePage(event: any){ // falta tipar
    this.page = event.page;
    this.size = event.rows;
    this.findStudents();
  }

  search(event: string){
    this.searchText = event;
    this.findStudents();
  }

  findStudents(){
    this.studentsService.find(this.searchText, this.page, this.size).subscribe(
      (response: any) => {
        this.students = response.content;
        this.totalRecords = response.totalElements;
        console.log(response);
      }
    );
  }

  displayDestroyModal(student: any){
    this.studentToDestroy = student;
    this.displayDestroyStudentModal = true;
  }
  
  destroyStudent(){    
    this.modalButtonLoading = true;
    this.studentsService.delete(this.studentToDestroy.id).subscribe(
      (response: any) => {
        // let indexToSplice = this.students.indexOf(this.studentToDestroy);
        // this.students.splice(indexToSplice, 1);
        this.findStudents();
        this.toastService.displaySuccess("Estudiante borrado correctamente");
        this.modalButtonLoading = false;
      }
    )
  }

  hideDestroyModal(){
    this.displayDestroyStudentModal = false;
    this.studentToDestroy = null;
  }

}
