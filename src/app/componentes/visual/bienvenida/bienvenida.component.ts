import { Component } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {
  public quienEs: any;

  constructor( public authlog: AutenticacionService){
    this.quienEs = authlog.usuario;
  }
}
