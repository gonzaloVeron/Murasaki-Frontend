import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from 'src/app/components/table/models/table-header';
import { ToastService } from '../shared/services/toast.service';
import { SidebarService } from '../shared/services/sidebar.service';
import { StudentsService } from '../shared/services/students.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Link } from '../shared/models/link';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentsComponent implements OnInit{

  loading: boolean = false;
  students: any[] = [];
  total: number = 0;
  limit: number = 5;
  headers: TableHeader[] = [
    { name: "Nombre", key: "name" },
    { name: "Nivel", key: "jlptLevel" },
    { name: "Email", key: "email"},
    { name: "teléfono", key: "tel"},
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

  /** Modal */
  displayLessonModal: boolean = false;
  modalLessonLoading: boolean = false;
  lessonForm: FormGroup;

  links: any[] = [];

  onSort(event: any){ //falta tipar

  }

  constructor(
    private studentsService: StudentsService, 
    private router: Router,
    private toastService: ToastService,
    private sidebarService: SidebarService,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildLessonForm();
    this.sidebarService.changeTitle("Estudiantes");
    this.studentsService.find("", 0, 5).subscribe(
      {
        next: (response: any) => { //falta tipar
          this.students = response.content;
          this.totalRecords = response.totalElements;
        },
        error: (responseError: any) => {
          this.errorHandlerService.handle(responseError);
        }
      }
    );
  }

  toStudentDetail(student: any){ //falta tipar
    this.router.navigate(["app", "sidebar", "student", student.id]);
  }

  onAdd(){
    this.router.navigate(["app", "sidebar", "student-form"]);
  }

  onUpdate(student: any){
    this.router.navigate(["app", "sidebar", "student-form", student.id]);
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
      {
        next: (response: any) => {
          this.students = response.content;
          this.totalRecords = response.totalElements;
        },
        error: (responseError: any) => {
          this.errorHandlerService.handle(responseError);
        }
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
      {
        next: (response: any) => {
          this.findStudents();
          this.toastService.displaySuccess("Estudiante borrado correctamente");
          this.modalButtonLoading = false;
          this.hideDestroyModal();
        },
        error: (responseError: any) => {
          this.errorHandlerService.handle(responseError);
          this.modalButtonLoading = false;
        }
      }
    )
  }

  hideDestroyModal(){
    this.displayDestroyStudentModal = false;
    this.studentToDestroy = null;
  }

  displayAddLessonModal(student: any){
    this.studentToDestroy = student; // utilizado temporalmente para agregar clases
    this.displayLessonModal = true;
  }
  
  hideLessonModal(){
    this.studentToDestroy = null;
    this.displayLessonModal = false;
    this.links = [];
    this.lessonForm.reset();
  }

  addLesson(){
    this.links = this.links.filter(link => link.title != "" && link.url != "");
    this.lessonForm.get("linkDTOS").setValue(this.links);
    if(this.lessonForm.valid){
      this.modalLessonLoading = true;
      this.studentsService.addLesson(this.studentToDestroy.id, this.lessonForm.getRawValue()).subscribe(
        {
          next: (response: any) => {
            this.modalLessonLoading = false;
            this.hideLessonModal();
            this.toastService.displaySuccess("Clase agregada correctamente");
          },  
          error: (resposneError: any) => {
            this.modalLessonLoading = false;
            this.errorHandlerService.handle(resposneError);
          }
        }
      )
    }
  }

  checkInvalid(fieldName: string) {
    return (this.lessonForm.get(fieldName).invalid && this.lessonForm.get(fieldName).touched) ? 'ng-invalid ng-dirty' : ''
  }

  buildLessonForm(){
    this.lessonForm = this.formBuilder.group({
      date: [null, Validators.required],
      content: [null, Validators.required],
      homework: [null],
      linkDTOS: [null, Validators.required]
    });
  }

  setDateInForm(event){
    this.lessonForm.get("date").setValue(event);
  }
  
  updateTitleLink(link, event){
    link.title = event.target.value;
  }

  updateUrlLink(link, event){
    link.url = event.target.value; 
  }

  addLink(){
    this.links.push(new Link("", ""));
  }

  removeLink(link){
    let index = this.links.indexOf(link);
    this.links.splice(index, 1);
  }
  

}
