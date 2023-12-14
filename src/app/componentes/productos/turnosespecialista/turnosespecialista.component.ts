import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CollectionReference, Firestore, Timestamp, collection, collectionData } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';
//import { TurnosespecialistasService } from 'src/app/servicios/turnos/turnosespecialistas.service';

@Component({
  selector: 'app-turnosespecialista',
  templateUrl: './turnosespecialista.component.html',
  styleUrls: ['./turnosespecialista.component.css']
})
export class TurnosespecialistaComponent {

  //public turnosFs: TurnosespecialistasService
  public listadoTurnos: Array<any> = [];
  public filtroEspecialista = '';
  public filtroEspecialdad = '';
  
  constructor(   public usrAutenticado: AutenticacionService, public especialidadesServ: EspecialidadesService, public fb: FormBuilder, private db: Firestore){
    //turnosFs.turnosDeUsuario( usrAutenticado.usuario.email );
  }

  
  public filtros = this.fb.group({
    especialidad: ['', []],
    paciente: ['', []]
  })

  ngOnInit(){
    collectionData( collection(this.db, 'turnos') ).subscribe( resp => {
      this.listadoTurnos = resp;
      
      let nomEspecialidad = this.filtros.controls.especialidad.value;
      let nomEspecialista = this.filtros.controls.paciente.value;
      if(nomEspecialidad) this.listadoTurnos = this.filtrarEspecialidad(this.listadoTurnos, nomEspecialidad);
      if(nomEspecialista) this.listadoTurnos = this.filtrarPaciente(this.listadoTurnos, nomEspecialista);
    })
  }

  filtrarEstado(estado: string){
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
