import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent implements OnInit {

  form: FormGroup;
  
  @Input() title: string = "Hora y fecha de inicio del servicio";

  @Input() isImportant: boolean = false;

  @Input() needHours: boolean = true;

  @Output("setDate") set: EventEmitter<string> = new EventEmitter<string>(); 
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.build();
  }
 
  build(){
    this.form = this.formBuilder.group({
      date: [null, Validators.compose([Validators.required, (this.needHours) ? this.validateDate : this.validateDateWithoutHours])]
    })
  }

  checkInvalid(fieldName: string){
    return (this.form.get(fieldName).invalid && this.form.get(fieldName).touched) ? 'ng-invalid ng-dirty' : ''
  }

  setTouched(){
    this.form.markAllAsTouched();
  }

  resetInput(){
    this.form.reset();
  }

  validateDate(control: AbstractControl) {
    let date: string = control.value;
    let valid: boolean = true;
    if(date){
      let day: number = parseInt(date.slice(0, 2));
      valid &&= day > 0 && day <= 31;
  
      let month = parseInt(date.slice(3, 5));
      valid &&= month > 0 && month <= 12;
  
      let year = parseInt(date.slice(6, 10));
      valid &&= year > 1900 && year <= 2100;

      let hours = parseInt(date.slice(11, 13));
      valid &&= hours >= 0 && hours <= 23;

      let minutes = parseInt(date.slice(14, 17));
      valid &&= minutes >= 0 && minutes <= 60;            
    }

    if (!valid) {
      return { invalidDate: true };
    }
    return null;
  }

  validateDateWithoutHours(control: AbstractControl){
    let date: string = control.value;
    let valid: boolean = true;
    if(date){
      let day: number = parseInt(date.slice(0, 2));
      valid &&= day > 0 && day <= 31;
  
      let month = parseInt(date.slice(3, 5));
      valid &&= month > 0 && month <= 12;
  
      let year = parseInt(date.slice(6, 10));
      valid &&= year > 1900 && year <= 2100;     
    }

    if (!valid) {
      return { invalidDate: true };
    }
    return null;
  }
  
  OnBlur(e){
    let day: string = e.target.value.slice(0, 2);
    let month: string = e.target.value.slice(3, 5);
    let year: number = parseInt(e.target.value.slice(6, 10));
    
    let result = `${year}-${month}-${day}`;

    if(this.needHours){
      let hours: number = parseInt(e.target.value.slice(11, 13));
      let minutes: number = parseInt(e.target.value.slice(14, 17));

      result += ` ${hours}:${minutes}:00`;
    }

    this.set.emit(result);
  }

  setMask(){
    return (this.needHours) ? "99/99/9999 99:99" : "99/99/9999";
  } 

  setSlotChar(){
    return (this.needHours) ? "dd/mm/aaaa hh:mm" : "dd/mm/aaaa";
  }
}
