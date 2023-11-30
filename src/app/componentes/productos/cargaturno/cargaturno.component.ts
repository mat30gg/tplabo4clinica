import { DatePipe, WeekDay } from '@angular/common';
import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { CollectionReference, Firestore, Timestamp, collection, collectionData } from '@angular/fire/firestore';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';
import { EspecialistasService } from 'src/app/servicios/datos/especialistas.service';
import { ManejoturnosService } from 'src/app/servicios/firestore/manejoturnos.service';
import { GrupoespecialistasService } from 'src/app/servicios/grupos/grupoespecialistas.service';

@Component({
  selector: 'app-cargaturno',
  templateUrl: './cargaturno.component.html',
  styleUrls: ['./cargaturno.component.css'],
})
export class CargaturnoComponent {

  @Output() evFechaDefinida = new EventEmitter<Date>();
  @Input() especialista: any;

  public momentoTurno: Date;
  public diaSeleccionado: Date;
  public horaSeleccionado: Date;

  public proximosXVdias: Array<Date> = [];
  public turnosDisponiblesDelDia: Array<Date> = [];

  public fechasOcupadas: Array<Date> = [];

  constructor(
    public db: Firestore,
  ) {
    
    for (let i = 0; i < 15; i++) {
      let fecha = new Date();
      fecha.setHours( 0, 0, 0, 0);
      fecha.setDate(fecha.getDate() + i+1);
      this.proximosXVdias[i] = fecha;
    }

  }

  enClickDia(dia: Date){
    this.diaSeleccionado = dia;
    let horarios = this.obtenerHorarios( dia );
    this.turnosDisponiblesDelDia = horarios.filter( val => { 
      return !this.fechasOcupadas.find( f => f.toString() === val.toString() );
    })
  }

  enClickHora(hora: Date){
    this.horaSeleccionado = hora;
    this.momentoTurno = this.diaSeleccionado;
    this.momentoTurno.setHours( hora.getHours(), hora.getMinutes());
    this.evFechaDefinida.emit( this.momentoTurno );
  }

  obtenerHorarios(dia: Date){
    let arrayReturn = [];
    for (let i = 0; i < 8; i++) {
      arrayReturn[i] = new Date(
        dia.getFullYear(),
        dia.getMonth(),
        dia.getDate(),
        8,
        0 + (60*i)
      );
    }
    return arrayReturn;
  }

  ColecTurnos( email: string ){
    return collection(this.db, 'usuarios/'+email+'/turnos');
  }

  ngOnChanges(cambios: SimpleChanges){
    if(cambios['especialista'] && cambios['especialista'].isFirstChange() ){
      collectionData( this.ColecTurnos( this.especialista?.email) ).subscribe( resp => {
        this.fechasOcupadas = resp.map( val => {
          console.log(val);
          return val['fecha'].toDate()} );
      })
    }
  }
}


  // @ViewChildren('textoBoton') botonesLista: QueryList<ElementRef>;

  // desplegarHorarios(dia: Date, i: number) {
  //   const referenciaEle = this.botonesLista.get(i);
  //   referenciaEle?.nativeElement.classList.remove('d-none');
  // }

  // contraerHorarios(dia: Date, i: number) {
  //   const referenciaEle = this.botonesLista.get(i);
  //   referenciaEle?.nativeElement.classList.add('d-none');
  // }