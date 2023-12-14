
export class Turno{

    public especialidad: any;
    public datosEspecialista: any;
    public fecha: Date;
    public datosPaciente: any;
    public estado: string = 'pendiente';
    public comentarios: string = "";

    // constructor( init?: Partial<Turno>){
    //     Object.assign(this, init);
    // }
    constructor( especialidad: any, fecha: Date, datosEspecialista: object, datosPaciente: object, estado: any = 'pendiente'){
        this.especialidad = especialidad;
        this.datosEspecialista = datosEspecialista;
        this.datosPaciente = datosPaciente;
        this.fecha = fecha;
        this.estado = estado;
    }
}
