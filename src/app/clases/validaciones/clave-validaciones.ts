import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ClaveValidaciones {

    constructor() {}

    static longitudValidacion(control: AbstractControl ): null | object {
        const clave = <string>control.value;
        const longitud = clave.length;

        if(longitud < 8){
            return {muyCorta: true}
        }else{
            return null;
        }
    }

    static confirmarClaveValidacion( control: AbstractControl ): null | object {
        const clave = control.get('clave')?.value;
        const confirmacionClave = control.get('confirmacionClave')?.value
        if(clave != confirmacionClave){
            return {clavesNoCoinciden : true}
        }
        return null;
    }
}
