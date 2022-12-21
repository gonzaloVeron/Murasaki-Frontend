import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { ToastService } from '../shared/services/toast.service';
import { StudentDetailsService } from '../shared/services/student-details.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Link } from '../shared/models/link';
import { ScheduleCard } from '../shared/models/ScheduleCard';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentDetailsComponent implements OnInit {

  student: any;

  lessons: any[] = [];

  lessonSelected: any;

  lessonForm: FormGroup
  links: any[] = [];

  /** Schedule Modal */
  isVisibleSchedule: boolean = false;

  isLoadingSchedule: boolean = false;

  scheduleForm: FormGroup;

  schedules: ScheduleCard[] = [];

  daysAvailables: any[] = [
    {
      id: 'Lunes',
      name: 'Lunes'
    },
    {
      id: 'Martes',
      name:'Martes'
    },
    {
      id: 'Miercoles',
      name:'Miercoles'
    },
    {
      id: 'Jueves',
      name:'Jueves'
    },
    {
      id: 'Viernes',
      name:'Viernes'
    },
    {
      id: 'Sabado',
      name:'Sabado'
    },
    {
      id: 'Domingo',
      name:'Domingo'
    },
  ];

  /** Destroy Modal */
  isVisibleDestroy: boolean = false;
  isLoadingDestroy: boolean = false;

  /** Add Modal */
  isVisibleAdd: boolean = false; 
  isLoadingAdd: boolean = false; 

  /** Update Modal */
  isVisibleUpdate: boolean = false;
  isLoadingUpdate: boolean = false;

  constructor(
    private routeSnapshot: ActivatedRoute, 
    private studentDetailService: StudentDetailsService, 
    private errorHandlerService: ErrorHandlerService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) { }

  deleteSched(e){
    this.studentDetailService.removeSchedule(this.student.id, e.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.lessons = response.lessons.map(this.toLessonElement).reverse();
        this.schedules = response.schedules;
        this.student = response;
        this.toastService.displaySuccess("Horario borrado");
      },
      error: (responseError: any) => {
        this.errorHandlerService.handle(responseError);
      }
    })
  }

  openSchedule(){
    this.isVisibleSchedule = true;
  }

  hideSchedule() {
    this.isVisibleSchedule = false;
    this.scheduleForm.reset();
  }

  createSchedule() {
    this.scheduleForm.markAllAsTouched();
    if(this.scheduleForm.valid){
      let sched = new ScheduleCard();
      let d: Date = this.scheduleForm.get('time').value;
      let hours = d.getHours() + ':' + ((d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes());
      sched.time = hours;
      sched.day = this.scheduleForm.get('day').value;
      this.studentDetailService.addSchedule(this.student.id, sched).subscribe({
        next: (response: any) => {
          console.log(response);
          this.lessons = response.lessons.map(this.toLessonElement).reverse();
          this.schedules = response.schedules;
          this.student = response;
          this.toastService.displaySuccess("Horario agregado");
          this.isVisibleSchedule = false;
          this.scheduleForm.reset();
        },
        error: (responseError: any) => {
          this.errorHandlerService.handle(responseError);
          this.scheduleForm.reset();
        }
      })
    }
  }

  schedBuilForm() {
    this.scheduleForm = this.formBuilder.group({
      day: [null, Validators.required],
      time: [null, Validators.required]
    });
  }

  checkInvalidSched(fieldName: string) {
    return (this.scheduleForm.get(fieldName).invalid && this.scheduleForm.get(fieldName).touched) ? 'ng-invalid ng-dirty' : ''
  }

  ngOnInit() {
    this.buildLessonForm();
    this.schedBuilForm();
    this.routeSnapshot.paramMap.subscribe({
      next: (paramsAsMap: any) => {
        const student_id = parseInt(paramsAsMap.params["id"]);
        this.getStudentById(student_id);
      },
      error: (err: any) => {
        console.error("Hubo un error al obtener la id de la url");
      }
    });
  }

  getStudentById(student_id: number){
    this.studentDetailService.getStudentById(student_id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.lessons = resp.lessons.map(this.toLessonElement).reverse();
        this.schedules = resp.schedules;
        this.student = resp;
        this.student.id = student_id;
      },
      error: (responseError: any) => {
        this.errorHandlerService.handle(responseError);
      }
    });
  }

  toLessonElement(elem: any){
    return { 
      status: elem.title,
      date: elem.date,
      content: elem.content, 
      icon: PrimeIcons.BOOK, 
      color: '#59558f', 
      links: elem.links, 
      homework: elem.homework, 
      id: elem.id 
    };
  }

  esPar(event){
    return this.lessons.indexOf(event) % 2 !== 0;
  }

  destroyLesson(){
    this.isLoadingDestroy = true;
    this.studentDetailService.deleteLessonById(this.student.id, this.lessonSelected.id).subscribe({
      next: (response: any) => {
        // const lessonIndex = this.lessons.indexOf(this.lessonSelected);
        // this.lessons = this.lessons.splice(lessonIndex, 1);
        this.getStudentById(this.student.id);
        this.isLoadingDestroy = false;
        this.hideDestroy();
        this.toastService.displaySuccess("Clase borrada correctamente.");
      },
      error: (responseError: any) => {
        this.isLoadingDestroy = false;
        this.errorHandlerService.handle(responseError);
      }
    })
  }
  
  addLesson(){
    this.links = this.links.filter(link => link.title != "" && link.url != "");
    this.lessonForm.get("linkDTOS").setValue(this.links);
    if(this.lessonForm.valid){
      this.isLoadingAdd = true;
      this.studentDetailService.addLesson(this.student.id, this.lessonForm.getRawValue()).subscribe(
        {
          next: (response: any) => {
            // this.lessons = response.lessons.map(this.toLessonElement);
            this.getStudentById(this.student.id);
            this.isLoadingAdd = false;
            this.hideAdd();
            this.toastService.displaySuccess("Clase agregada correctamente");
          },  
          error: (resposneError: any) => {
            this.isLoadingAdd = false;
            this.errorHandlerService.handle(resposneError);
          }
        }
      )
    }
  }

  updateLesson(){
    this.links = this.links.filter(link => link.title != "" && link.url != "");
    this.lessonForm.get("linkDTOS").setValue(this.links);
    let lessonToSend =  this.lessonForm.getRawValue();
    let d: string = lessonToSend.date.toLocaleDateString();
    lessonToSend.date = d;
    if(this.lessonForm.valid){
      this.isLoadingUpdate = true;
      this.studentDetailService.updateLesson(this.lessonSelected.id, this.lessonForm.getRawValue()).subscribe(
        {
          next: (response: any) => {
            this.getStudentById(this.student.id);
            this.isLoadingUpdate = false;
            this.hideUpdate();
            this.toastService.displaySuccess("Clase agregada correctamente");
          },  
          error: (resposneError: any) => {
            this.isLoadingUpdate = false;
            this.errorHandlerService.handle(resposneError);
          }
        }
      )
    }
  }

  displayUpdate(lesson: any){
    this.isVisibleUpdate = true;
    this.lessonSelected = lesson;
    this.lessonForm.get("title").setValue(lesson.status);
    this.lessonForm.get("date").setValue(this.addHours(lesson.date, 3));
    this.lessonForm.get("content").setValue(lesson.content);
    this.lessonForm.get("homework").setValue(lesson.homework);
    this.lessonForm.get("linkDTOS").setValue(lesson.links);
    this.links = lesson.links;
  }

  addHours(date, hours) {
    const dateCopy = new Date(date);
    dateCopy.setHours(dateCopy.getHours() + hours);
    return dateCopy;
  }

  hideUpdate(){
    this.lessonSelected = false;
    this.isVisibleUpdate = false;
    this.lessonForm.reset();
    this.links = [];
  }
  
  hideAdd(){
    this.isVisibleAdd = false;
    this.lessonForm.reset();
    this.links = [];
  }

  displayAdd(){
    this.isVisibleAdd = true;
  }

  hideDestroy(){
    this.isVisibleDestroy = false;
    this.lessonSelected = null;
  }

  displayDestroy(lesson: any){
    this.isVisibleDestroy = true;
    this.lessonSelected = lesson;
  }

  buildLessonForm(){
    this.lessonForm = this.formBuilder.group({
      title: [null, Validators.required],
      date: [null, Validators.compose([Validators.required])],
      content: [null, Validators.required],
      homework: [null],
      linkDTOS: [[]]
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

  checkInvalid(fieldName: string) {
    return (this.lessonForm.get(fieldName).invalid && this.lessonForm.get(fieldName).touched) ? 'ng-invalid ng-dirty' : ''
  }

  //** */
  validateDate(control: AbstractControl) {
    let date: string = control.value;
    let valid: boolean = true;
    if(date){
      let day: number = parseInt(date.slice(0, 2));
      valid &&= day > 0 && day <= 31;
  
      let month = parseInt(date.slice(3, 5));
      valid &&= month > 0 && month <= 12;
  
      let year = parseInt(date.slice(6, 10));
      valid &&= year > 1900 && year <= 2100;

      let hours = parseInt(date.slice(11, 13));
      valid &&= hours >= 0 && hours <= 23;

      let minutes = parseInt(date.slice(14, 17));
      valid &&= minutes >= 0 && minutes <= 60;            
    }

    if (!valid) {
      return { invalidDate: true };
    }
    return null;
  }

  validateDateWithoutHours(control: AbstractControl){
    let date: string = control.value?.toLocaleDateString();
    let valid: boolean = true;
    if(date){
      let day: number = parseInt(date.slice(0, 2));
      valid &&= day > 0 && day <= 31;
  
      let month = parseInt(date.slice(3, 5));
      valid &&= month > 0 && month <= 12;
  
      let year = parseInt(date.slice(6, 10));
      valid &&= year > 1900 && year <= 2100;     
    }

    if (!valid) {
      return { invalidDate: true };
    }
    return null;
  }

}
