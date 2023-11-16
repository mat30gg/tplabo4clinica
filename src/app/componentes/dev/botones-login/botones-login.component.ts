import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-botones-login',
  templateUrl: './botones-login.component.html',
  styleUrls: ['./botones-login.component.css']
})
export class BotonesLoginComponent {
  @Output() clickUsuarioEvent = new EventEmitter<object>();

  clickUsuario1(){
    this.clickUsuarioEvent.emit({
      email: 'johngus@gmail.com',
      clave: 'eldoctor23'
    })
  }
  clickUsuario2(){
    this.clickUsuarioEvent.emit({
      email: 'rigomartin@gmail.com',
      clave: 'misalud23'
    })
  }
  clickUsuario3(){
    this.clickUsuarioEvent.emit({
      email: 'admin@gmail.com',
      clave: 'admin'
    })
  }
  clickUsuario4(){
    this.clickUsuarioEvent.emit({
      email: 'jramon67@gmail.com.com',
      clave: 'clave12345'
    })
  }
}
