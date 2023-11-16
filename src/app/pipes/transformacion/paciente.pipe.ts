import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreapellido'
})
export class PacientePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    let strinReturn = (value.nombre?value.nombre:'') + (value.apellido?' '+value.apellido:'');
    return strinReturn;
  }

}
