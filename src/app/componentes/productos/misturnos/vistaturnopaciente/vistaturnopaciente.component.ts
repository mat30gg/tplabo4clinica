import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Turno } from 'src/app/clases/entidades/turno';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vistaturnopaciente',
  templateUrl: './vistaturnopaciente.component.html',
  styleUrls: ['./vistaturnopaciente.component.css']
})
export class VistaturnopacienteComponent {

  @Input() turno : any ;

  getdate(fecha: Timestamp ){
    if(!fecha) return null;
    return fecha.toDate();
  }
}
