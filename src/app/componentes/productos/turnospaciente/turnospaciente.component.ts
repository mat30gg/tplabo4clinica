import { Component } from '@angular/core';
import { Firestore, Timestamp, collection, collectionData } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';

@Component({
  selector: 'app-turnospaciente',
  templateUrl: './turnospaciente.component.html',
  styleUrls: ['./turnospaciente.component.css']
})
export class TurnospacienteComponent {
  public listadoTurnos: Array<any> = [];
  public filtroEspecialista = '';
  public filtroEspecialdad = '';
  
  constructor( public usrAutenticado: AutenticacionService, public especialidadesServ: EspecialidadesService, public fb: FormBuilder, private db: Firestore){ }

  
  public filtros = this.fb.group({
    especialidad: ['', []],
    especialista: ['', []]
  })

  ngOnInit(){
    collectionData( collection(this.db, 'turnos') ).subscribe( resp => {
      this.listadoTurnos = resp;
      
      let nomEspecialidad = this.filtros.controls.especialidad.value;
      let nomEspecialista = this.filtros.controls.especialista.value;
      if(nomEspecialidad) this.listadoTurnos = this.filtrarEspecialidad(this.listadoTurnos, nomEspecialidad);
      if(nomEspecialista) this.listadoTurnos = this.filtrarEspecialista(this.listadoTurnos, nomEspecialista);
    })
  }

  filtrarEstado(estado: string){
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
