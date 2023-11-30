import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-botones-login',
  templateUrl: './botones-login.component.html',
  styleUrls: ['./botones-login.component.css']
})
export class BotonesLoginComponent {
  @Output() clickUsuarioEvent = new EventEmitter<object>();

  clickPaciente1(){
    this.clickUsuarioEvent.emit({
      email: 'gomezmartin@gmail.com',
      clave: 'peso1234'
    })
  }
  clickPaciente2(){
    this.clickUsuarioEvent.emit({
      email: 'rigomartin@gmail.com',
      clave: 'misalud23'
    })
  }
  clickPaciente3(){
    this.clickUsuarioEvent.emit({
      email: 'jramon67@gmail.com',
      clave: 'clave12345'
    })
  }
  clickEspecialista1(){
    this.clickUsuarioEvent.emit({
      email: 'johngus@gmail.com',
      clave: 'eldoctor23'
    })
  }
  clickEspecialista2(){
    this.clickUsuarioEvent.emit({
      email: 'migueljuan@gmail.com',
      clave: 'clave123'
    })
  }
  clickAdmin1(){
    this.clickUsuarioEvent.emit({
      email: 'admin@gmail.com',
      clave: 'admin'
    })
  }
}
