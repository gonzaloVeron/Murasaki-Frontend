/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ApiRestBase } from '../shared/services/api_rest_base.service';
import { SharedModule } from '../shared/shared.module';
import { httpClientSpy } from './http-client-spy';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        StudentFormComponent,
      ],
      imports: [     
        SharedModule,
        AppRoutingModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        ToastModule,
        InputTextareaModule,
        MultiSelectModule,
        HttpClientModule,
        AppRoutingModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        ApiRestBase,
        StudentFormService,
        MessageService
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
});
