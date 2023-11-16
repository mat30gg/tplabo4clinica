import { Component } from '@angular/core';
import { Timestamp, addDoc, collection, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Claseturnos } from 'src/app/clases/firestore/claseturnos';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';
import { TurnosespecialistasService } from 'src/app/servicios/turnos/turnosespecialistas.service';
import { TurnospacientesService } from 'src/app/servicios/turnos/turnospacientes.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent {

  public listadoTurnos: Array<any> = [];
  public filtroEspecialista = '';
  public filtroEspecialdad = '';

  comentariosCancelacion: any = [];
  
  constructor( private turnosFs: TurnosespecialistasService ,public usrAutenticado: AutenticacionService, public especialidadesServ: EspecialidadesService, public fb: FormBuilder){
    turnosFs.todosLosTurnos();
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

  cancelarTurno( turno: any, comentario: string) {
    turno.comentarios = comentario;
    turno.estado = 'cancelado';
    updateDoc( doc(this.turnosFs.db, 'turnos/'+turno.idturno), turno);
  }
}
