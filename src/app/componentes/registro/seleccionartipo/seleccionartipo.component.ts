import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'controlseleccionartipo',
  templateUrl: './seleccionartipo.component.html',
  styleUrls: ['./seleccionartipo.component.css']
})
export class SeleccionartipoComponent {

  @Input() menuAdmin = false;
  @Output() seleccionTipo = new EventEmitter<string>();

  enClickTipo(tipo: string){
    this.seleccionTipo.emit(tipo);
  }
}
