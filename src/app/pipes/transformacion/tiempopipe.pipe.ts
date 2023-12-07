import { Pipe, PipeTransform } from '@angular/core';
import { Tiempo } from 'src/app/clases/entidades/tiempo';

@Pipe({
  name: 'tiempopipe'
})
export class TiempopipePipe implements PipeTransform {

  transform(value: Tiempo, ...args: unknown[]): unknown {
    return value.hora.toString().padStart(2, '0')+':'+value.minuto.toString().padStart(2, '0');
  }

}
