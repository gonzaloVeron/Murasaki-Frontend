import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timePipe'
})
export class TimePipe implements PipeTransform {

  transform(date: Date | string, format: string = "dd-MM-yyyy"): string {
    const dateObj = new Date(date);
    const localeDate = dateObj.toLocaleDateString();
    let day = "";
    let month = "";
    let year = "";
    if(localeDate.length > 9){
      day = localeDate.substring(0, 2);
      month = this.parseToString(localeDate.substring(3, 5));
      year = localeDate.substring(6, 11);
    }else{
      day = localeDate.substring(0, 1);
      month = this.parseToString(localeDate.substring(2, 4));
      year = localeDate.substring(5, 10);
    }
    return `${day} de ${month} del ${year}`;
  }

  parseToString(stDate: string): string {
    switch(parseInt(stDate)){
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Septiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      case 12:
        return "Diciembre";
      default:
        return "Mes no identificado";
    }
  }

}




