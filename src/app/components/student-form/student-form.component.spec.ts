/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentFormComponent } from './student-form.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { StudentFormService } from '../shared/services/student-form.service';
import { ButtonModule } from 'primeng/button';
import { ApiRestBase } from '../shared/services/api_rest_base.service';
import { SharedModule } from '../shared/shared.module';
import { DividerModule } from 'primeng/divider';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AuthModule } from '../auth/auth.module';
import { RippleModule } from 'primeng/ripple';
import { TimelineModule } from 'primeng/timeline';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { apiRestBaseSpy } from '../shared/spies/api-rest-base-spy';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { LocalUserService } from '../shared/services/local-user.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>; 
  let localUserService: LocalUserService;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    localUserService = new LocalUserService();
    localUserService.saveUserData({
      teacherName: "Gonzalo G. Verón",
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjcsImlzcyI6Ik11cmFzYWtpQXBpIiwiZXhwIjoxNjY3NTQzNDc4fQ.7ozamjNtO-sHdMcCDkk-eVy9NOmD-Tc7jr1gCFNpHcU"
    });

    TestBed.configureTestingModule({
      declarations: [ 
        StudentFormComponent,
      ],
      imports: [     
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CommonModule,
        SharedModule,
        HttpClientModule,
        ReactiveFormsModule,
        TableModule,
        PaginatorModule,
        DialogModule,
        SplitButtonModule,
        ToggleButtonModule,
        InputMaskModule,
        CardModule,
        TagModule,
        SkeletonModule,
        InputTextModule,
        InputNumberModule,
        ToastModule,
        TimelineModule,
        InputTextareaModule,
        MultiSelectModule,
        RippleModule,
        ButtonModule,
        AuthModule,
        OverlayPanelModule,
        DividerModule
      ],
      providers: [
        // { provide: HttpClient, useValue: httpClientSpy },
        { provide: ApiRestBase, useValue: apiRestBaseSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: new BehaviorSubject({
              id: 5,
            })
          },
        },
        // { provide: LocalUserService, useValue: localUserService },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to auth path when click button and get an error with code 401', () => {
    spyOn(component.studentFormService, "update").and.returnValue(throwError(() => { return { error: { status: 401 } } }));
    const button = getByTestId("saveOrUpdateButton");
    button.children[0].click();
    fixture.detectChanges();
    const navigateArgs = routerSpy.navigate.calls.first().args[0];
    expect(navigateArgs).toContain("auth");
  });

  it('should trigger edit when click button', () => {
    const button = getByTestId("saveOrUpdateButton");
    button.children[0].click();
    fixture.detectChanges();
    expect(apiRestBaseSpy.put).toHaveBeenCalled();
  });

  it('should contain the name of the selected student', () => {
    const input = getByTestId('student_name');
    expect(input.value).toBe("Ranni la bruja");
  });

  it('should contain the email of the selected student', () => {
    const input = getByTestId('student_email');
    expect(input.value).toBe("ranni@gmail.com");
  });

  it('should contain the age of the selected student', () => {
    const input = getByTestId('student_age');
    expect(+input.children[0].children[0].value).toBe(25);
  });
  
  it('should contain the student_emailTutor of the selected student', () => {
    const input = getByTestId('student_emailTutor');
    expect(input.value).toBe("tutor2@gmail.com");
  });

  it('should contain the student_tel of the selected student', () => {
    const input = getByTestId('student_tel');
    expect(+input.children[0].children[0].value).toBe(1162641228);
  });

  it('should contain the student_jlptLevel of the selected student', () => {
    const input = getByTestId('student_jlptLevel');
    expect(+input.children[0].children[0].value).toBe(5);
  });

  it('should contain the student_jlptLevel of the selected student', () => {
    const input = getByTestId('student_jlptLevel');
    expect(+input.children[0].children[0].value).toBe(5);
  });

  it('should contain the teacher_name of the actual user', () => {
    const input = getByTestId('teacher_name');
    expect(input.value).toBe("Gonzalo G. Verón");
  });

  it('should contain the student_interests of the selected student', () => {
    const input: Element = getByTestId('student_interests');
    const labels: HTMLCollection = input.children[0].children[1].children[0].children;
    const labelValues = [];
    for(let i = 0; i < labels.length; i++){
      labelValues.push(labels.item(i).textContent);
    }
    expect(labelValues).toContain("Trabajo");
    expect(labelValues).toContain("Cultura");
    expect(labelValues).toContain("Estudios");
  });

  it('should contain the student_interests of the selected student', () => {
    const input = getByTestId('student_priorKnowledge');
    expect(input.value).toBe("No sabe nada de japones");
  });

  it('should see save button with name Modificar', () => {
    const button = getByTestId('saveOrUpdateButton');
    expect(button.textContent).toBe("Modificar");
  });

  it('should see save button enabled', () => {
    const button = getByTestId("saveOrUpdateButton");
    expect(button.children[0].disabled).toBeFalsy();
  });

  it('should see save button disabled', () => {
    component.studentForm.get("name").setValue(null);
    const button = getByTestId("saveOrUpdateButton");
    fixture.detectChanges();
    expect(button.children[0].disabled).toBeTruthy();
  });

  it('should go to other page when click button', () => {
    apiRestBaseSpy.put.and.returnValue(of({}));
    const button = getByTestId("saveOrUpdateButton");
    button.children[0].click();
    fixture.detectChanges();
    expect(apiRestBaseSpy.put).toHaveBeenCalled();
    const navigateArgs = routerSpy.navigate.calls.first().args[0];
    expect(navigateArgs).toContain("app");
    expect(navigateArgs).toContain("sidebar");
    expect(navigateArgs).toContain("students");
  });

  function getByTestId(testId: string){
    const resultHtml = fixture.debugElement.nativeElement;
    return resultHtml.querySelector(`[data-testid="${testId}"]`);
  }

});

/*
  data-testid="saveOrUpdateButton"
  data-testid="student_name"
  data-testid="student_email"
  data-testid="student_age"
  data-testid="student_emailTutor"
  data-testid="student_tel"
  data-testid="student_jlptLevel"
  data-testid="student_interests"
  data-testid="student_priorKnowledge"

  data-testid="teacher_name"

  age: 25,
  email: "ranni@gmail.com",
  emailTutor: "tutor2@gmail.com",
  interests: interestsList,
  jlptLevel: 5,
  lessons: [],
  name: "Ranni la bruja",
  priorKnowledge: "No sabe nada de japones",
  teacherAsignedId: 6,
  tel: 1162641228

  // - caso feliz, buscar un estudiante, seleccionarlo y editar algún dato
  // - casos por error, con datos incorrectos
  // - mockear httpClient para aumentar la cobertura

*/

