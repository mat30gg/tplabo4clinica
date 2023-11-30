import { Component } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { UsuariosService } from 'src/app/servicios/firestore/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formLogin = this.fbuilder.record({
    email: ['', [Validators.email]],
    clave: ['', []],
  });

  constructor(
    public dbusuarios: UsuariosService,
    public fbuilder: FormBuilder,
    public authLog: AutenticacionService,
    public ruter: Router,
    private db: Firestore
  ) {}

  loguearse() {
    const colUsuarios = collection(this.db, 'usuarios');
    const docRef = doc(colUsuarios, '/'+this.formLogin.controls['email'].value);
    const valoresForm = this.formLogin.value;
    getDoc(docRef).then(value => {
      if( value.data()?.['accesoHabilitado'] && value.data()?.['emailVerificado'] ){
        let datosUsuario = value.data()?.['datos'];
        if( datosUsuario.clave == valoresForm['clave'] ){
          this.authLog.login( datosUsuario );
          this.ruter.navigate(['/home']);
        }
      }
    })
  }

  devClickUsuario(usuario: any) {
    this.formLogin.setValue(usuario);
  }
}
