import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizar'
})
export class NormalizarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(!value){
      return null;
    }

    let palabra = value as string;
    palabra = palabra.toLowerCase();
    let letra0 = palabra.charAt(0).toUpperCase();
    palabra = letra0 + palabra.slice(1);
    return palabra;
  }

}
