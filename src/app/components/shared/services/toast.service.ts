import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

constructor(private messageService: MessageService) { }

  displayCustom(severity: string, summary: string, detail: string){
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  displayError(detail: string){
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detail
    });
  }

  displaySuccess(detail: string){
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito!',
      detail: detail
    });
  }

  displayInfo(detail: string){
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: detail
    });
  }

  displayWarn(detail: string){
    this.messageService.add({
      severity: 'warn',
      summary: 'Cuidado!',
      detail: detail
    });
  }

}
