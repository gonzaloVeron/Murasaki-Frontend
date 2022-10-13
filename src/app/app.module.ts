import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TimelineModule } from 'primeng/timeline';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from 'primeng/api';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    StudentsComponent,
    StudentDetailsComponent,
    SidebarComponent
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
    ButtonModule,
    DialogModule,
    SplitButtonModule,
    ToggleButtonModule,
    InputMaskModule,
    CardModule,
    RippleModule,
    TagModule,
    SkeletonModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
    TimelineModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
