import { DatePipe, WeekDay } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';
import { ManejoturnosService } from 'src/app/servicios/firestore/manejoturnos.service';

@Component({
  selector: 'app-cargaturno',
  templateUrl: './cargaturno.component.html',
  styleUrls: ['./cargaturno.component.css']
})
export class CargaturnoComponent {

  public proximosXVdias: Array<Date> = [];
  public horariosDelDia: Array<Date> = [];
  public carruselFechaMinimo = 0;
  public carruselFechaMaximo = 3;
  public formTurno: FormGroup<any>;


  constructor( public especialidadesServ: EspecialidadesService, fb: FormBuilder, public usrAuth: AutenticacionService, public mturnoServ: ManejoturnosService ){ 

    let fecha;
    for( let i = 0; i < 15; i++){
      fecha = new Date();
      fecha.setDate(fecha.getDate() + i );
      this.proximosXVdias[i] = fecha;
    }

    let nuevoDia;
    let mins;
    for( let i=0; i<8; i++){
      nuevoDia = new Date();
      mins = 30*i;
      nuevoDia.setHours(8, mins, 0);
      this.horariosDelDia[i] = nuevoDia ;
    }

    this.formTurno = fb.group({
      especialidadTurno: ['ginecologia', []],
      especialistaTurno: [{nombre: 'Daniel', apellido: 'Peralta', email: 'elpapu23@gmail.com', especialidad: 'ginecologia'}, []],
      horarioTurno: ['', []]
    })
  }

  subirCarrusel(){
    let longitudCarrusel = this.proximosXVdias.length;
    if( this.carruselFechaMaximo < longitudCarrusel ){
      this.carruselFechaMaximo += 1;
      this.carruselFechaMinimo += 1;
    }
  }

  bajarCarrusel(){
    if( this.carruselFechaMinimo > 0 ){
      this.carruselFechaMinimo -= 1;
      this.carruselFechaMaximo -= 1;
    }
  }

  @ViewChildren("textoBoton") botonesLista: QueryList<ElementRef>;

  desplegarHorarios( dia: Date, i: number ){
    // const indiceDia = this.proximosXVdias.indexOf(dia);
    // const referenciaEle = this.botonesLista.find((item, index) => index === indiceDia );
    const referenciaEle = this.botonesLista.get(i);
    referenciaEle?.nativeElement.classList.remove('d-none');
  }

  contraerHorarios( dia: Date, i: number){
    const referenciaEle = this.botonesLista.get(i);
    referenciaEle?.nativeElement.classList.add('d-none');
  }

  obtenerHorarios(dia: Date): Array<Date>{
    let arrayReturn = this.horariosDelDia;
    for(let i = 0; i < this.horariosDelDia.length; i++){
      
      arrayReturn[i] = new Date(dia.getFullYear(), dia.getMonth(), dia.getDate(), 
      this.horariosDelDia[i].getHours(), this.horariosDelDia[i].getMinutes(), this.horariosDelDia[i].getSeconds())
    }
    return arrayReturn;
  }

  establecerDia(fecha: Date){
    this.formTurno.controls['horarioTurno'].setValue(fecha.toLocaleString('ES-ar'));
  }

  pedirTurno(){
    this.mturnoServ.agregarTurno( Object.assign({}, this.formTurno.value));
  }
}
