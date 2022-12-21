import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ToastService } from '../shared/services/toast.service';
import { SidebarService } from '../shared/services/sidebar.service';
import { TableHeader } from '../table/models/table-header';
import { TeachersService } from '../shared/services/teachers.service';
import { LocalUserService } from '../shared/services/local-user.service';

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

  teachersAvailables: any[] = [];

  selectedIdTransferTeacher: any;

  isVisibleTransf: boolean = false;
  isLoadingTransf: boolean = false;

  teacherTransfSelectedName: string = "";

  isAdmin: boolean = false;

  onSort(event: any){ //falta tipar

  }

  constructor(
    private toastService: ToastService,
    private teachersService: TeachersService,
    private formBuilder: FormBuilder,
    private sidebarService: SidebarService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private localUserService: LocalUserService
  ) { }

  ngOnInit() {
    this.isAdmin = this.localUserService.getUser() == "Administrador";
    this.sidebarService.changeTitle("Profesores");
    this.buildForm();
    this.teachersService.find("", 0, 5).subscribe(
      {
        next: (response: any) => {
          this.teachers = response.content;
          this.totalRecords = response.totalElements;
        },
        error: (responseError: any) => {
          this.errorHandlerService.handle(responseError);
        }
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
    if(this.isAdmin){
      this.displayAddOrUpdateTeacherModal = true;
    }else{
      this.toastService.displayInfo("Solo los Administradores pueden crear nuevos profesores");
    }
  }

  onUpdate(teacher: any){
    this.teacherId = teacher.id;
    this.getTeacherToModify();
    this.displayAddOrUpdateTeacherModal = true;
  }

  getTeacherToModify(){
    this.teachersService.getUserTeacherById(this.teacherId).subscribe(
      {
        next: (response: any) => {
          let keys = Object.keys(response);
          keys.forEach(k => {
            if(!(k == "id" || k == "students")){
              this.teacherForm.get(k).setValue(response[k]);
            }
          });
        },
        error: (responseError: any) => {
          this.errorHandlerService.handle(responseError);
        }
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
      {
        next: (response: any) => {
          this.teachers = response.content;
          this.totalRecords = response.totalElements;
        },
        error: (responseError: any) => {
          this.errorHandlerService.handle(responseError);
        }
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
      {
        next: (response: any) => {
          this.findTeachers();
          this.toastService.displaySuccess("Profesor borrado correctamente");
          this.destroyModalButtonLoading = false;
          this.displayDestroyTeacherModal = false;
        },
        error: (error: any) => {
          this.errorHandlerService.handle(error);
        }
      }
    );
  }

  hideDestroyModal(){
    this.displayDestroyTeacherModal = false;
    this.teacherToDestroy = null;
  }

  hideAddOrUpdateModal(){
    this.teacherId = null;
    this.displayAddOrUpdateTeacherModal = false;
    this.teacherForm.reset();
  }

  addOrUpdateTeacher(){
    if(this.teacherForm.valid){
      this.addModalButtonLoading = true;
      if(this.teacherId){
        this.teachersService.update(this.teacherId, this.teacherForm.getRawValue()).subscribe(
          {
            next: (response: any) => {
              this.findTeachers();
              this.toastService.displaySuccess("Profesor modificado correctamente")
              this.addModalButtonLoading = false;
              this.teacherForm.reset();
              this.hideAddOrUpdateModal();
              this.teacherId = null;
            },
            error: (responseError: any) => {
              this.errorHandlerService.handle(responseError);
            }
          }
         );
      }else{
        this.teachersService.save(this.teacherForm.getRawValue()).subscribe(
          {
            next: (response: any) => {
              this.findTeachers();
              this.toastService.displaySuccess("Profesor agregado correctamente")
              this.addModalButtonLoading = false;
              this.teacherForm.reset();
              this.hideAddOrUpdateModal();
            },
            error: (responseError: any) => {
              this.errorHandlerService.handle(responseError);
            }
          }
        );
      }
    }
  }

  checkInvalid(fieldName: string){
    return (this.teacherForm.get(fieldName).invalid && this.teacherForm.get(fieldName).touched) ? 'ng-invalid ng-dirty' : ''
  }

  /** ------------------------------------------------------- */

  hideTransf(){
    this.teacherId = null;
    this.selectedIdTransferTeacher = null;
    this.teacherTransfSelectedName = "";
    this.isVisibleTransf = false;
  }

  acceptTransf(){
    this.router.navigate(['app', 'sidebar', 'transfer', this.teacherId, this.selectedIdTransferTeacher]);
  }

  onTransf(teacher){
    if(this.isAdmin){
      this.teacherTransfSelectedName = teacher.name;
      this.teacherId = teacher.id;
      this.teachersAvailables = this.teachers.map(elem => {return { name: elem.name, id: elem.id }}).filter(elem => elem.id != this.teacherId);
      // this.teachersAvailables = this.teachers.map(elem => {return { name: elem.name, id: elem.id }});
      this.isVisibleTransf = true;
    }else{
      this.router.navigate(['app', 'sidebar', 'transfer', teacher.id]);
    }
  }

  getTransfModalTitle(){
    return 'Transferir alumnos de ' + this.teacherTransfSelectedName + ' a...';
  }

}
