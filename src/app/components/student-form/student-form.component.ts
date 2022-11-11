import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ToastService } from '../shared/services/toast.service';
import { StudentFormService } from './student-form.service';
import { LocalUserService } from '../shared/services/local-user.service';

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

  isLoading: boolean = false;

  actualTeacherName: string;

  constructor(
    private formBuilder: FormBuilder,
    public studentFormService: StudentFormService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private localUserService: LocalUserService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.actualTeacherName = this.localUserService.getUser();
      this.getAllTeachers();
      this.getAllInterests();
      this.buildForm();
      if (params.id) {
        this.studentId = params.id;
        this.getStudentToModify();
      }
    });
  }

  buildForm() {
    this.studentForm = this.formBuilder.group({
      name: [null, Validators.required],
      jlptLevel: [null, Validators.required],
      priorKnowledge: [null],
      tel: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      emailTutor: [null, Validators.compose([Validators.required, Validators.email])],
      age: [null, Validators.required],
      interests: [null, Validators.required]
    });
  }

  checkInvalid(fieldName: string) {
    return (this.studentForm.get(fieldName).invalid && this.studentForm.get(fieldName).touched) ? 'ng-invalid ng-dirty' : ''
  }

  getAllTeachers() {
    this.studentFormService.getAllTeachers().subscribe(
      {
        next: (response: any) => {
          this.teachersAvailables = response.map(elem => {
            return { id: elem.id, name: elem.name };
          });
        },
        error: (responseError: any) => {
          this.errorHandlerService.handle(responseError);
        }
      }
    )
  }

  getStudentToModify() {
    this.studentFormService.getStudentById(this.studentId).subscribe(
      {
        next: (response: any) => {
          let keys = Object.keys(response);
          keys.forEach(k => {
            if (!(k == 'lessons' || k == 'id' || k == 'teacherAsignedId')) {
              this.studentForm.get(k).setValue(response[k]);
            }
          });
        },
        error: (responseError: any) => {
          this.errorHandlerService.handle(responseError);
        }
      }
    )
  }
  
  getAllInterests() {
    this.studentFormService.getAllInterests().subscribe(
      {
        next: (response: any) => {
          this.interestsList = response;
        },
        error: (error: any) => {
          this.errorHandlerService.handle(error);
        }
      }
    )
  }

  saveOrUpdate() {
    if (this.studentForm.valid) {
      this.isLoading = true;
      if (this.studentId) {
        this.studentFormService.update(this.studentId, this.studentForm.getRawValue()).subscribe(
          {
            next: (response: any) => {
              this.toastService.displaySuccess("Estudiante actualizado correctamente");
              this.isLoading = false;
              this.router.navigate(["app", "sidebar", "students"])
            },
            error: (error: any) => {
              this.errorHandlerService.handle(error);
              this.isLoading = false;
            }
          }
        );
      } else {
        this.studentFormService.save(this.studentForm.getRawValue()).subscribe(
          {
            next: (response: any) => {
              this.toastService.displaySuccess("Estudiante guardado correctamente");
              this.isLoading = false;
              this.router.navigate(["app", "sidebar", "students"])
            },
            error: (error: any) => {
              this.errorHandlerService.handle(error);
              this.isLoading = false;
            }
          }
        );
      }
    }
  }

}
