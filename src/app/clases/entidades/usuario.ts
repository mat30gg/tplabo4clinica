import { DatePipe, formatDate, getLocaleDateFormat } from "@angular/common";

export class Usuario {
    public tipoUsuario: any;
    public nombre: any;
    public apellido: any;
    public clave: any;
    public edad: any;
    public email: any;
    public dni: any;
    public fechaCreacionUsuario: any;
    public direccionimagenes: string;

        constructor(init? : Partial<Usuario>){
            Object.assign(this, init);
            this.fechaCreacionUsuario = Date();
    }
}