import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';

import { ToastService } from './services/toast.service';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonComponent } from './button/button.component';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from './modal/modal.component';
import { LocalUserService } from './services/local-user.service';
import { LinkComponent } from './link/link.component';
import { RecoveryService } from './services/recovery.service';
import { InputDateComponent } from './input-date/input-date.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    InputMaskModule,
    ReactiveFormsModule
  ],
  providers: [
    ToastService, 
    MessageService,
    LocalUserService,
    RecoveryService,
  ],
  declarations: [
    LinkComponent,
    SharedComponent,
    ButtonComponent,
    ModalComponent,
    InputDateComponent
  ],
  exports:[
    ButtonComponent,
    ModalComponent,
    LinkComponent,
    InputDateComponent
  ]
})
export class SharedModule { }
