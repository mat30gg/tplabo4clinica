import { Component, EventEmitter, Output } from '@angular/core';
import { GrupoespecialistasService } from 'src/app/servicios/grupos/grupoespecialistas.service';

@Component({
  selector: 'app-seleccionar-especialista',
  templateUrl: './seleccionar-especialista.component.html',
  styleUrls: ['./seleccionar-especialista.component.css']
})
export class SeleccionarEspecialistaComponent {

  @Output() clickEspecialista = new EventEmitter<any>();

  constructor( public dbespecialistas: GrupoespecialistasService ){
  }

  enClickEspecialista( especialista: any ){
    this.clickEspecialista.emit( especialista.datos );
  }
}
