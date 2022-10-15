import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { WidthConfig } from './models/width-config';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  @Input('title') title: string = '';
  
  @Input('isVisible') isVisible: boolean = false;
  @Input('isLoading') isLoading: boolean = false;
  @Input('isModal') isModal: boolean = false;
  
  @Input('needFooter') needFooter: boolean = true;
  @Input('minWidth') minWidth: WidthConfig;

  @Output('onAccept') onAcceptEvent: EventEmitter<void> = new EventEmitter();
  @Output('onCancel') onCancelEvent: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  accept(){
    this.onAcceptEvent.emit();
  }

  cancel(){
    this.onCancelEvent.emit();
  }
}
