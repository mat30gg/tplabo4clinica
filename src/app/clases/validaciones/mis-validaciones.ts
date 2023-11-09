import { AbstractControl } from "@angular/forms";

export class MisValidaciones {
    constructor() {}

    static espaciosValidacion(control: AbstractControl): null | object {
        const clave = <string>control.value;
        const espacios = clave.includes(' ');

        if(espacios){
            return {espacios: true}
        }else{
            return null;
        }
    }

    
}
