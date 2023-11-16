import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'barrasivacio'
})
export class BarrasivacioPipe implements PipeTransform {

  transform(value: any, date = false): any {
    if(date ){
      if( !value ) return new Date();
    } else {
      if(value === undefined || value === null || value === ''){
        return '-';
      }
      if(typeof value === 'number' && isNaN(value) ){
        return '-';
      }
      if(typeof value === 'object' && Object.keys(value).length === 0){
        return '-';
      }
    }
    return value;
  }

}
