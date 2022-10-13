import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { ToastService } from './services/toast.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ToastService],
  declarations: [SharedComponent]
})
export class SharedModule { }
