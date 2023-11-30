import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/clases/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-navbarcomp',
  templateUrl: './navbarcomp.component.html',
  styleUrls: ['./navbarcomp.component.css']
})
export class NavbarcompComponent {
  @Input() rolUsuario = '';

  constructor(public authlog: AutenticacionService){ }

  cerrarSesion(){
    this.authlog.logout();
  }
}
