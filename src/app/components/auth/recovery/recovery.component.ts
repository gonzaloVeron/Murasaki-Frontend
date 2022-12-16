import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { RecoveryService } from '../../shared/services/recovery.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecoveryComponent implements OnInit {

  isLoading: boolean = false;

  recoveryForm: FormGroup

  constructor(
    private formBuilder: FormBuilder, 
    private recoveryService: RecoveryService,
    private toastService: ToastService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.recoveryForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.email, Validators.required])],
    });
  }

  recover(){
    this.isLoading = true;
    this.recoveryService.sendRecoveryMail(this.recoveryForm.getRawValue().email).subscribe(
      {
        next: (response: any) => {
          this.isLoading = false;
          this.toastService.displaySuccess("Se ha enviado un mail para la recuperación");
          this.router.navigate(["auth"]);
        },
        error: (responseError: any) => {
          this.isLoading = false;
          this.toastService.displaySuccess("Se ha enviado un mail para la recuperación");
          this.router.navigate(["auth"]);
          //this.errorHandlerService.handle(responseError);
        }
      }      
    );
  }

}
