import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CollectionReference, Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';
import { TurnosespecialistasService } from 'src/app/servicios/turnos/turnosespecialistas.service';

@Component({
  selector: 'app-turnosespecialista',
  templateUrl: './turnosespecialista.component.html',
  styleUrls: ['./turnosespecialista.component.css']
})
export class TurnosespecialistaComponent {

  public listadoTurnos: Array<any> = [];
  public filtroEspecialista = '';
  public filtroEspecialdad = '';
  
  constructor( public turnosFs: TurnosespecialistasService  ,public usrAutenticado: AutenticacionService, public especialidadesServ: EspecialidadesService, public fb: FormBuilder){
    turnosFs.turnosDeUsuario( usrAutenticado.usuario.email );
  }

  
  public filtros = this.fb.group({
    especialidad: ['', []],
    paciente: ['', []]
  })


  testeo(val: any){
    console.log(val);
  }

  filtrarLista(){
    this.listadoTurnos = this.turnosFs.listadoTurnos;

    let nomEspecialidad = this.filtros.controls.especialidad.value;
    let nomPaciente = this.filtros.controls.paciente.value;
    if(nomEspecialidad) this.listadoTurnos = this.filtrarEspecialidad(this.listadoTurnos, nomEspecialidad);
    if(nomPaciente) this.listadoTurnos = this.filtrarPaciente(this.listadoTurnos, nomPaciente);

    return this.listadoTurnos;
  }

  filtrarEstado(estado: string){
    this.listadoTurnos = this.filtrarLista();
    
    return this.listadoTurnos.filter( turn => turn.estado === estado)
  }

  filtrarPaciente(lista: Array<any> = [], pacienteNomb: string = ''){
    return lista.filter( turn => {
      if(!pacienteNomb) return true;
      let paciNomb = turn.pacienteTurno.nombre??'';
      let paciApe = turn.pacienteTurno.apellido??'';
      return ((paciNomb+' '+paciApe).substring(0, pacienteNomb.length).toUpperCase() == pacienteNomb.toUpperCase()) || (paciApe.substring(0, pacienteNomb.length).toUpperCase() == pacienteNomb.toUpperCase());
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
