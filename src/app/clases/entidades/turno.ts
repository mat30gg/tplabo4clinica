import { ClaseFirestore } from "../conexion-firestore";
import { Especialista } from "./especialista";
import { Paciente } from "./paciente";

export class Turno{

    public especialidadTurno: string;
    public especialistaTurno: Especialista;
    public horarioTurno: Date;
    public pacienteTurno: Paciente;
    public estado: string = 'pendiente';

    constructor( init?: Partial<Turno>){
        Object.assign(this, init);
    }
}
