import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalUserService } from './local-user.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {


  constructor(
    private toastService: ToastService, 
    private localUserService: LocalUserService,
    private router: Router
  ) { }

  handle(errorResponse: any){
    if(errorResponse.error.status == 401){
      this.toastService.displayError(errorResponse.error.message);
      this.localUserService.removeUser();
      this.router.navigate(["auth"]);
    }
    if (errorResponse.error.status < 500) {
      this.toastService.displayError(errorResponse.error.message);
    }
    else {
      this.toastService.displayError("Ha ocurrido un error. Consulte al administrador del sistema.");
      console.error(errorResponse.error.message);
    }
  }

}
