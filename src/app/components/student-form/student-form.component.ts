import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { StudentFormService } from './services/student-form.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  studentForm: FormGroup;

  teachersAvailables: any[];

  interestsList: any[];

  studentId: number;

  constructor(
    private formBuilder: FormBuilder,
    private studentFormService: StudentFormService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getAllTeachers();
      this.getAllInterests();
      this.buildForm();
      if(params.id){
        this.studentId = params.id;      
        this.getStudentToModify();  
      }
    });
  }

  buildForm(){
    this.studentForm = this.formBuilder.group({
      name: [null, Validators.required],
      jlptLevel: [null, Validators.required],
      teacherAsignedId: [null, Validators.required],
      priorKnowledge: [null],
      tel: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      emailTutor: [null, Validators.compose([Validators.required, Validators.email])],
      age: [null, Validators.required],
      interests: [null, Validators.required]
    });
  }

  checkInvalid(fieldName: string){
    return (this.studentForm.get(fieldName).invalid && this.studentForm.get(fieldName).touched) ? 'ng-invalid ng-dirty' : ''
  }

  getAllTeachers(){
    this.studentFormService.getAllTeachers().subscribe(
      (response: any) => {
        this.teachersAvailables = response.map(elem => {
          return {id: elem.id, name: elem.name};
        });
      }
    )
  }

  getStudentToModify(){
    this.studentFormService.getStudentById(this.studentId).subscribe(
      (response: any) => {
        let keys = Object.keys(response);
        console.log(response);
        keys.forEach(k => {
          if(!(k == 'lessons' || k == 'id')){
            this.studentForm.get(k).setValue(response[k]);
          }
        });
      }
    )
  }

  getAllInterests(){
    this.studentFormService.getAllInterests().subscribe(
      (response: any) => {
        this.interestsList = response;
      }
    )
  }

  saveOrUpdate(){
    //console.log(this.studentForm.getRawValue());
    if(this.studentForm.valid){
      if(this.studentId){
        this.studentFormService.update(this.studentId, this.studentForm.getRawValue()).subscribe(
          (response: any) => {
            this.toastService.displaySuccess("Estudiante actualizado correctamente");
            this.router.navigate(["app", "sidebar", "students"])
          }
        );
      }else{
        this.studentFormService.save(this.studentForm.getRawValue()).subscribe(
          (response: any) => {
            this.toastService.displaySuccess("Estudiante guardado correctamente");
            this.router.navigate(["app", "sidebar", "students"])
          }
        );
      }
    }
  }

}
