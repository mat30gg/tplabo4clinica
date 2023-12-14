import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';

@Component({
  selector: 'app-filtroturnos',
  templateUrl: './filtroturnos.component.html',
  styleUrls: ['./filtroturnos.component.css']
})
export class FiltroturnosComponent {

  @Input() listadoTurnos : Array<any> = [];
  @Input() modoEspecialista = false;
  @Output() evCambioFiltros = new EventEmitter<Array<any>>();

  public nomEspecialidad = '';
  public nomPersona = '';

  constructor( public espec: EspecialidadesService ){ }

  filtrarLista(){
    let listaAux = this.listadoTurnos;

    if(this.nomEspecialidad) listaAux = this.filtrarEspecialidad(listaAux, this.nomEspecialidad);
    if(this.nomPersona) listaAux = this.filtrarNombre(listaAux, this.nomPersona);

    this.evCambioFiltros.emit( listaAux );
  }


  filtrarNombre(lista: Array<any> = [], nomPersona: string = ''){
    return lista.filter( turn => {
      if(!nomPersona) return true;
      let espec = this.modoEspecialista?(turn.datosPaciente['nombre']??''):(turn.datosEspecialista['nombre']??'');
      return espec.substring(0, nomPersona.length).toUpperCase() == nomPersona.toUpperCase();
    });
  }
  
  filtrarEspecialidad(lista: Array<any> = [], nomEspecialidad: string = ''){
    return lista.filter( turn => {
      if(!nomEspecialidad) return true;
      let espec = turn.especialidad??'';
      return espec.substring(0, nomEspecialidad.length).toUpperCase() == nomEspecialidad.toUpperCase();
    });
  }

}
