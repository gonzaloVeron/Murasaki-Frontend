import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ToastService } from '../shared/services/toast.service';
import { LocalUserService } from '../shared/services/local-user.service';
import { StudentFormService } from '../shared/services/student-form.service';
import { SidebarService } from '../shared/services/sidebar.service';
import { ScheduleCard } from '../shared/models/ScheduleCard';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  studentForm: FormGroup;

  isVisibleSchedule: boolean = false;

  isLoadingSchedule: boolean = false;

  scheduleForm: FormGroup;

  teachersAvailables: any[];
  
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

  interestsList: any[];

  studentId: number;

  isLoading: boolean = false;

  actualTeacherName: string;

  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public studentFormService: StudentFormService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private localUserService: LocalUserService,
    private sidebarService: SidebarService
  ) { }
  
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
      this.schedules.push(sched);
      this.isVisibleSchedule = false;
      this.scheduleForm.reset();
      this.studentForm.get('schedules').setValue(this.schedules);
    }
  }

  deleteSched(e){
    let index = this.schedules.indexOf(this.schedules.find(sched => sched === e));
    this.schedules.splice(index, 1)
  }

  schedBuilForm() {
    this.scheduleForm = this.formBuilder.group({
      day: [null, Validators.required],
      time: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.isAdmin = this.localUserService.getUser() === "Administrador";
    this.activatedRoute.params.subscribe((params: any) => {
      this.actualTeacherName = this.localUserService.getUser();
      this.getAllTeachers();
      this.getAllInterests();
      this.buildForm();
      this.schedBuilForm();
      if (params.id) {
        this.studentId = params.id;
        this.getStudentToModify();
      }
      this.sidebarService.changeTitle((!this.studentId) ? "Nuevo estudiante" : "Modificación de estudiante");
    });
  }

  buildForm() {
    if(this.isAdmin){
      this.studentForm = this.formBuilder.group({
        name: [null, Validators.required],
        jlptLevel: [null, Validators.compose([Validators.required, Validators.max(5), Validators.min(1)])],
        priorKnowledge: [null],
        teacherAsignedId: [null, Validators.required],
        tel: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        emailTutor: [null],
        age: [null, Validators.required],
        interests: [null, Validators.required],
        schedules: [null, Validators.required]
      });
    }else{
      this.studentForm = this.formBuilder.group({
        name: [null, Validators.required],
        jlptLevel: [null, Validators.compose([Validators.required, Validators.max(5), Validators.min(1)])],
        priorKnowledge: [null],
        tel: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        emailTutor: [null],
        age: [null, Validators.required],
        interests: [null, Validators.required],
        schedules: [null, Validators.required]
      });
    }
  }

  checkInvalid(fieldName: string) {
    return (this.studentForm.get(fieldName).invalid && this.studentForm.get(fieldName).touched) ? 'ng-invalid ng-dirty' : ''
  }

  checkInvalidSched(fieldName: string) {
    return (this.scheduleForm.get(fieldName).invalid && this.scheduleForm.get(fieldName).touched) ? 'ng-invalid ng-dirty' : ''
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
          if(this.isAdmin){
            keys.forEach(k => {
              if (!(k == 'lessons' || k == 'id')) {
                this.studentForm.get(k).setValue(response[k]);
              }
            });
          }else{
            keys.forEach(k => {
              if (!(k == 'lessons' || k == 'id' || k == 'teacherAsignedId')) {
                this.studentForm.get(k).setValue(response[k]);
              }
            });
          }
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
