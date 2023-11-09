import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/clases/entidades/usuario';

@Component({
  selector: 'app-navbarcomp',
  templateUrl: './navbarcomp.component.html',
  styleUrls: ['./navbarcomp.component.css']
})
export class NavbarcompComponent {
  @Input() rolUsuario = '';
}
