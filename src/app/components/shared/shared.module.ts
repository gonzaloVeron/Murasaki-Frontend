import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';

import { ToastService } from './services/toast.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from './button/button.component';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from './modal/modal.component';
import { LocalUserService } from './services/local-user.service';
import { LinkComponent } from './link/link.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule
  ],
  providers: [
    ToastService, 
    MessageService,
    LocalUserService
  ],
  declarations: [
    LinkComponent,
    SharedComponent,
    ButtonComponent,
    ModalComponent
  ],
  exports:[
    ButtonComponent,
    ModalComponent,
    LinkComponent
  ]
})
export class SharedModule { }
