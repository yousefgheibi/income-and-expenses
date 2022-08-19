import { Pipe, PipeTransform } from '@angular/core';
import * as momentJalaali from 'moment-jalaali';

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {


  transform(value: number): Date {
    return momentJalaali(new Date(value)).format('jM/jD');
  }


}
