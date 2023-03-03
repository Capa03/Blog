import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'unixToTimestamp'
})
export class UnixToTimestampPipe  extends DatePipe implements PipeTransform {
  dateFormat: string = "";


  override transform(value: any, args?: any): any {
    if(super.transform(value*1000, "dd/MM/yyyy") != super.transform(Date.now(), "dd/MM/yyyy")){
        if(super.transform(value*1000, "yyyy") == super.transform(Date.now(), "yyyy")){
          this.dateFormat = "dd/MM";
        }else{
          this.dateFormat = "dd/MM/yyyy";
        }
    }else{
      this.dateFormat = "HH:mm";
    }
    return super.transform(value*1000, this.dateFormat);
 }

}
