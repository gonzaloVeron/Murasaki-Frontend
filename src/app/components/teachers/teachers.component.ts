import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { SidebarService } from '../sidebar/services/sidebar.service';
import { TableHeader } from '../table/models/table-header';
import { TeachersService } from './services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  loading: boolean = false;
  teachers: any[] = [];
  total: number = 0;
  limit: number = 5;
  headers: TableHeader[] = [
    { name: "Nombre", key: "name" },
    { name: "", key: "" },
  ];

  teacherForm: FormGroup;

  totalRecords: number = 0;
  page: number = 0;
  size: number = 5;
  searchText: string = "";

  /** Destroy modal */
  teacherToDestroy: any;
  displayDestroyTeacherModal: boolean = false;
  destroyModalButtonLoading: boolean = false;

  /** Add modal */
  displayAddOrUpdateTeacherModal: boolean = false;
  addModalButtonLoading: boolean = false;

  teacherId: number;


  onSort(event: any){ //falta tipar
    console.log(event);
  }

  constructor(
    private toastService: ToastService,
    private teachersService: TeachersService,
    private formBuilder: FormBuilder,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.sidebarService.changeTitle("Profesores");
    this.buildForm();
    this.teachersService.find("", 0, 5).subscribe(
      (response: any) => {
        this.teachers = response.content;
        console.log(this.teachers);
        this.totalRecords = response.totalElements;
      }
    );
  }

  buildForm(){
    this.teacherForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      name: [null, Validators.required]
    });
  }

  onAdd(){
    this.displayAddOrUpdateTeacherModal = true;
  }

  onUpdate(teacher: any){
    this.teacherId = teacher.id;
    this.getTeacherToModify();
    this.displayAddOrUpdateTeacherModal = true;
  }

  getTeacherToModify(){
    this.teachersService.getUserTeacherById(this.teacherId).subscribe(
      (response: any) => {
        let keys = Object.keys(response);
        keys.forEach(k => {
          console.log(k)
          if(!(k == "id" || k == "students")){
            this.teacherForm.get(k).setValue(response[k]);
          }
        });
      }
    )
  }

  changePage(event: any){ // falta tipar
    this.page = event.page;
    this.size = event.rows;
    this.findTeachers()
  }

  search(event: string){
    this.searchText = event;
    this.findTeachers();
  }

  findTeachers(){
    this.teachersService.find(this.searchText, this.page, this.size).subscribe(
      (response: any) => {
        this.teachers = response.content;
        this.totalRecords = response.totalElements;
        console.log(response);
      }
    );
  }

  displayDestroyModal(student: any){
    this.teacherToDestroy = student;
    this.displayDestroyTeacherModal = true;
  }
  
  destroyTeacher(){    
    this.destroyModalButtonLoading = true;
    this.teachersService.delete(this.teacherToDestroy.id).subscribe(
      (response: any) => {
        this.findTeachers();
        this.toastService.displaySuccess("Profesor borrado correctamente");
        this.destroyModalButtonLoading = false;
        this.displayDestroyTeacherModal = false;
      }
    );
  }

  hideDestroyModal(){
    this.displayDestroyTeacherModal = false;
    this.teacherToDestroy = null;
  }

  hideAddOrUpdateModal(){
    this.displayAddOrUpdateTeacherModal = false;
    this.teacherForm.reset();
  }

  addOrUpdateTeacher(){
    if(this.teacherForm.valid){
      this.addModalButtonLoading = true;
      if(this.teacherId){
        this.teachersService.update(this.teacherId, this.teacherForm.getRawValue()).subscribe(
          (response: any) => {
            this.findTeachers();
            this.toastService.displaySuccess("Profesor modificado correctamente")
            this.addModalButtonLoading = false;
            this.teacherForm.reset();
            this.hideAddOrUpdateModal();
            this.teacherId = null;
          }
         );
      }else{
        this.teachersService.save(this.teacherForm.getRawValue()).subscribe(
         (response: any) => {
           this.findTeachers();
           this.toastService.displaySuccess("Profesor agregado correctamente")
           this.addModalButtonLoading = false;
           this.teacherForm.reset();
           this.hideAddOrUpdateModal();
         }
        );
      }
    }
  }

  checkInvalid(fieldName: string){
    return (this.teacherForm.get(fieldName).invalid && this.teacherForm.get(fieldName).touched) ? 'ng-invalid ng-dirty' : ''
  }

}
