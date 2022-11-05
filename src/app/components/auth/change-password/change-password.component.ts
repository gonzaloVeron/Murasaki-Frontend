import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { RecoveryService } from '../../shared/services/recovery.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  isLoading: boolean = false;

  recoveryForm: FormGroup

  token: string = "";

  constructor(
    private formBuilder: FormBuilder, 
    private recoveryService: RecoveryService,
    private toastService: ToastService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params: any) => {
        console.log(params);
        this.token = params.token;
      },
      error: (error: any) => {

      }
    })
    this.buildForm();
  }

  buildForm(){
    this.recoveryForm = this.formBuilder.group({
      password: ["", Validators.required],
    });
  }

  changePassword(){
    this.isLoading = true;
    this.recoveryService.changePassword(this.token, this.recoveryForm.getRawValue().password).subscribe(
      {
        next: (response: any) => {
          this.isLoading = false;
          this.toastService.displaySuccess("Se ha cambiado la contraseña");
          this.router.navigate(["auth"]);
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorHandlerService.handle(error);
        }
      }      
    );
  }
}
