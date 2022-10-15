import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';

import { ToastService } from './services/toast.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from './button/button.component';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule
  ],
  providers: [
    ToastService, 
    MessageService
  ],
  declarations: [
    SharedComponent,
    ButtonComponent,
    ModalComponent
  ],
  exports:[
    ButtonComponent,
    ModalComponent
  ]
})
export class SharedModule { }