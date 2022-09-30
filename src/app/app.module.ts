import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputMaskModule } from 'primeng/inputmask';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    StudentsComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    DialogModule,
    SplitButtonModule,
    ToggleButtonModule,
    InputMaskModule,
    CardModule,
    RippleModule,
    TagModule,
    SkeletonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
