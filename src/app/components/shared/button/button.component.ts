import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {

  @Input('text') text: string = '';
  @Input('isDisabled') isDisabled: boolean = false;
  @Input('isLoading') isLoading: boolean = false;
  @Input('isCancel') isCancel: boolean = false;
  @Input('icon') icon: string = '';
  @Output('onClick') onClickEvent: EventEmitter<void> = new EventEmitter();
  

  constructor() { }

  ngOnInit() {
  }

  getIcon(){
    return (this.isLoading) ? 'pi pi-spin pi-spinner' : this.icon;
  }

  emitClick(){
    this.onClickEvent.emit();
  }

}
