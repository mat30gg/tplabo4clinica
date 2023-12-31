import { Usuario } from "./usuario";

export class Paciente extends Usuario{
    public obraSocial: any;
    public mailVerificado: boolean = true;
    

    constructor(init? : Partial<Paciente> ){
        super();
        Object.assign(this, init);  
        this.tipoUsuario = 'paciente';  
    }
}
