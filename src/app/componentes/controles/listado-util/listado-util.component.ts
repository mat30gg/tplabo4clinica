import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-listado-util',
  templateUrl: './listado-util.component.html',
  styleUrls: ['./listado-util.component.css']
})
export class ListadoUtilComponent {

  @Output() clickElemento = new EventEmitter<any>();
  @Input() listadoElementos : Array<any> = [];

  enClickEspecialidad( elemento: any ){
    this.clickElemento.emit( elemento );
  }

}
