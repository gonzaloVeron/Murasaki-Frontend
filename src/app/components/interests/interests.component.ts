import { Component, OnInit } from '@angular/core';
import { InterestsService } from '../shared/services/interests.service';
import { SidebarService } from '../shared/services/sidebar.service';
import { TableHeader } from '../table/models/table-header';
import { library, findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ToastService } from '../shared/services/toast.service';
import { PrimeIcons } from 'primeng/api';

library.add(fas, far, fab)

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  loading: boolean = false;
  interests: any[] = [];
  total: number = 0;
  limit: number = 5;
  headers: TableHeader[] = [
    { name: "Nombre", key: "name" },
    { name: "", key: "" },
  ];

  totalRecords: number = 0;
  page: number = 0;
  size: number = 5;
  searchText: string = "";
  icons: any[] = [];

  interestId: number;
  modalLoading: boolean = false;
  display: boolean = false;

  interestForm: FormGroup

  selectedIcon: any;

  displayDestroy: boolean = false;
  isLoadingDestroy: boolean = false;
  interestToDestroy: any;

  constructor(
    private sidebarService: SidebarService, 
    private interestsService: InterestsService, 
    private formBuilder: FormBuilder,
    private errorHandlerServicer: ErrorHandlerService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.sidebarService.changeTitle("Intereses");
    this.icons = this.parseIcons(PrimeIcons);
    this.buildForm();
    this.findAllInterests();
  }

  parseIcons(icons){
    let result = Object.keys(icons).map(key => {         
        return {
          name: key,
          icon: PrimeIcons[key]
        }
      }
    );
    return result;
  }

  toIconText(st: string){
    let res = "";
    for(let c of st){
      if(/^\p{Lu}/u.test(c)){
        res += "-" + c.toLowerCase();
      }else{
        res += c.toLowerCase();
      }
    }
    return res;
  }

  buildForm(){
    this.interestForm = this.formBuilder.group({
      name: [null, Validators.required], 
      icon: [null, Validators.required]
    });
  }

  test(student){

  }

  onSort(event: any){ //falta tipar

  }

  onAdd(){
    this.display = true;
  }

  changePage(event: any){ // falta tipar
    this.page = event.page;
    this.size = event.rows;
    this.findInterests();
  }

  search(event: string){
    this.searchText = event;
    this.findInterests();
  }

  findInterests(){
    this.interestsService.find(this.searchText, this.page, this.size).subscribe(
      {
        next: (response: any) => {
          this.interests = response.content;
          this.totalRecords = response.totalElements;
        },
        error: (responseError: any) => {
          this.errorHandlerServicer.handle(responseError);
        }
      }
    )
  }

  findAllInterests(){
    this.interestsService.findAll(0, 5).subscribe(
      {
        next: (response: any) => {
          this.interests = response.content;
          this.totalRecords = response.totalElements;
        },
        error: (responseError: any) => {
          this.errorHandlerServicer.handle(responseError);
        }
      }
    )
  }

  hideModal(){
    this.interestForm.reset();
    this.display = false;
  }

  addOrUpdateInterest(){
    this.interestForm.markAllAsTouched();
    if(this.interestForm.valid){
      this.display = true;
      this.interestsService.create(this.interestForm.getRawValue()).subscribe(
        {
          next: (response: any) => {
            this.toastService.displaySuccess("Interés agregado correctamente");
            this.findAllInterests();
            this.hideModal();
            this.display = false;
          },
          error: (error: any) => {
            this.errorHandlerServicer.handle(error);
            this.display = false;
          }
        }
      )
    }
  }

  checkInvalid(fieldName: string) {
    return (this.interestForm.get(fieldName).invalid && this.interestForm.get(fieldName).touched) ? 'ng-invalid ng-dirty' : ''
  }

  openDestroy(interest: any){
    this.interestToDestroy = interest;
    this.displayDestroy = true;
  }

  hideDestroyModal(){
    this.interestToDestroy = null;
    this.displayDestroy = false;
  }

  destroyInterest(){
    this.isLoadingDestroy = true;
    this.interestsService.delete(this.interestToDestroy.id).subscribe(
      {
        next: (response: any) => {
          this.searchText = "";
          this.findAllInterests();
          this.toastService.displaySuccess("El interes fue borrado correctamente");
          this.hideDestroyModal();
          this.isLoadingDestroy = false;
        },
        error: (error: any) => {
          this.errorHandlerServicer.handle(error);
          this.isLoadingDestroy = false;
        }
      }
    )
  }

}
