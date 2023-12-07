import { Usuario } from "./usuario";

export class Especialista extends Usuario{
    public especialidad: any;
    public aprobado: boolean = true;
    public mailVerificado: boolean = true;
    

    constructor(init? : Partial<Especialista> ){
        super();
        Object.assign(this, init);
        this.tipoUsuario = 'especialista';
    }
}
