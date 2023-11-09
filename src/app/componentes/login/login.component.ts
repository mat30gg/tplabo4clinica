import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { UsuariosService } from 'src/app/sevicios/firestore/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formLogin = this.fbuilder.record({
    email: ['', [Validators.email]],
    clave: ['', []]
  })

  constructor( public dbusuarios: UsuariosService, public fbuilder: FormBuilder, public authLog: AutenticacionService, public ruter: Router){ }

  loguearse(){
    for( let usr of this.dbusuarios.listaElementos ){

      if(usr.email == this.formLogin.controls['email'].value){

        if(usr.aprobado && usr.aprobado == false ) return
        if(usr.mailVerificado && usr.mailVerificado == false) return


        if(usr.clave == this.formLogin.controls['clave'].value){
          switch(usr.tipoUsuario){
            case 'paciente':
              this.authLog.login().setPaciente();
              break;
            case 'especialista':
              this.authLog.login().setEspecialista();
              break;
            case 'administrador':
              this.authLog.login().setAdmin();
              break;
          }
          this.authLog.usuario = usr;
          this.ruter.navigate(['home']);
        } else {
          return
        }
      }
    }
  }

  clickUsuario1(){
    this.formLogin.setValue({
      email: 'johngus@gmail.com',
      clave: 'eldoctor23'
    })
  }
  clickUsuario2(){
    this.formLogin.setValue({
      email: 'rigomartin@gmail.com',
      clave: 'misalud23'
    })
  }
  clickUsuario3(){
    this.formLogin.setValue({
      email: 'admin@gmail.com',
      clave: 'admin'
    })
  }
}
