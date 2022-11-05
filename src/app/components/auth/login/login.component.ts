import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { LocalUserService } from '../../shared/services/local-user.service';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;

  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder, 
    private loginService: LoginService, 
    private localUserService: LocalUserService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.email, Validators.required])],
      password: ["", Validators.required]
    });
  }

  login(){
    this.isLoading = true;
    this.loginService.authenticate(this.loginForm.getRawValue()).subscribe(
      {
        next: (response: any) => {
          this.localUserService.saveUserData(
            {
              teacherName: response.teacherName,
              token: response.token
            }
          );
          this.isLoading = false;
          this.router.navigate(["app"]);
        },
        error: (responseError) => {
          this.isLoading = false;
          this.errorHandlerService.handle(responseError);
        }
      }      
    );
  }

  toRecovery(){
    this.router.navigate(["auth", "recovery"]);
  }
  
}
