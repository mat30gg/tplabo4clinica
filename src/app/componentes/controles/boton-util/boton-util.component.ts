import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'boton-util',
  templateUrl: './boton-util.component.html',
  styleUrls: ['./boton-util.component.css']
})
export class BotonUtilComponent {

  @Output() clickBoton = new EventEmitter<any>();
  @Input() elementoUtil: any = '';
  @Input() clases: string = "btn btn-outline-info rounded-pill";

  enClickDefault() {
    this.clickBoton.emit(this.elementoUtil);
  }
}
