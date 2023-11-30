import { Component, Input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-vistaturnomedico',
  templateUrl: './vistaturnomedico.component.html',
  styleUrls: ['./vistaturnomedico.component.css']
})
export class VistaturnomedicoComponent {
  @Input() turno : any ;

  getdate(fecha: Timestamp ){
    if(!fecha) return null;
    return fecha.toDate();
  }
}
