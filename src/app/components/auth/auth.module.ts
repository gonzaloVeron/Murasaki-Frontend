import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/services/login.service';
import { AuthRoutingModule } from './auth-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    ProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [
    //AuthComponent,
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class AuthModule { }
