import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-seleccionar-especialidad',
  templateUrl: './seleccionar-especialidad.component.html',
  styleUrls: ['./seleccionar-especialidad.component.css']
})
export class SeleccionarEspecialidadComponent {

  @Output() clickEspecialidad = new EventEmitter<any>();
  @Input() listadoEspecialidades : Array<any> = [];

  constructor( db: Firestore ){
    
  }

  enClickEspecialidad( especialidad: any ){
    this.clickEspecialidad.emit( especialidad );
  }
}
