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
import { SidebarService } from './services/sidebar.service';
import { ApiRestBase } from './services/api_rest_base.service';
import { TimePipe } from './pipes/time.pipe';
import { ScheduleCardComponent } from './schedule-card/schedule-card.component';

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
    SidebarService,
    ApiRestBase
  ],
  declarations: [
    LinkComponent,
    SharedComponent,
    ButtonComponent,
    ModalComponent,
    InputDateComponent,
    TimePipe,
    ScheduleCardComponent
  ],
  exports:[
    ButtonComponent,
    ModalComponent,
    LinkComponent,
    InputDateComponent,
    TimePipe,
    ScheduleCardComponent
  ]
})
export class SharedModule { }
