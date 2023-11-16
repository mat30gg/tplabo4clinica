import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CollectionReference, Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';
import { TurnospacientesService } from 'src/app/servicios/turnos/turnospacientes.service';

@Component({
  selector: 'app-turnospaciente',
  templateUrl: './turnospaciente.component.html',
  styleUrls: ['./turnospaciente.component.css']
})
export class TurnospacienteComponent {
  public listadoTurnos: Array<any> = [];
  public filtroEspecialista = '';
  public filtroEspecialdad = '';
  
  constructor( public turnosFs: TurnospacientesService, public usrAutenticado: AutenticacionService, public especialidadesServ: EspecialidadesService, public fb: FormBuilder){
    turnosFs.turnosDeUsuario( usrAutenticado.usuario.email );
  }

  
  public filtros = this.fb.group({
    especialidad: ['', []],
    especialista: ['', []]
  })


  testeo(val: any){
    console.log(val);
  }

  filtrarLista(){
    this.listadoTurnos = this.turnosFs.listadoTurnos;

    let nomEspecialidad = this.filtros.controls.especialidad.value;
    let nomEspecialista = this.filtros.controls.especialista.value;
    if(nomEspecialidad) this.listadoTurnos = this.filtrarEspecialidad(this.listadoTurnos, nomEspecialidad);
    if(nomEspecialista) this.listadoTurnos = this.filtrarEspecialista(this.listadoTurnos, nomEspecialista);

    return this.listadoTurnos;
  }

  filtrarEstado(estado: string){
    this.listadoTurnos = this.filtrarLista();
    
    return this.listadoTurnos.filter( turn => turn.estado === estado)
  }

  filtrarEspecialista(lista: Array<any> = [], nomEspecialista: string = ''){
    return lista.filter( turn => {
      if(!nomEspecialista) return true;
      let espec = turn.especialistaTurno??'';
      return espec.substring(0, nomEspecialista.length).toUpperCase() == nomEspecialista.toUpperCase();
    });
  }

  filtrarEspecialidad(lista: Array<any> = [], nomEspecialidad: string = ''){
    return lista.filter( turn => {
      if(!nomEspecialidad) return true;
      let espec = turn.especialidadTurno??'';
      return espec.substring(0, nomEspecialidad.length).toUpperCase() == nomEspecialidad.toUpperCase();
    });
  }

  getdate(fecha: Timestamp ){
    if(!fecha) return null;
    return fecha.toDate();
  }
}
