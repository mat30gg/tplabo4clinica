import { Component, Inject, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
  Validators,
  NgControl,
  RequiredValidator,
  PatternValidator,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Especialista } from 'src/app/clases/entidades/especialista';
import { Paciente } from 'src/app/clases/entidades/paciente';
import { Usuario } from 'src/app/clases/entidades/usuario';
import { ClaseStorage } from 'src/app/clases/firestorage/clase-storage';
import { ClaveValidaciones } from 'src/app/clases/validaciones/clave-validaciones';
import { MisValidaciones } from 'src/app/clases/validaciones/mis-validaciones';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';

import { UsuariosService } from 'src/app/servicios/firestore/usuarios.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  usuario: any;
  tipoUsuario = '';
  @Input() menuAdmin: boolean = false;

  fTipousuario = this.fbuilder.group({
    tipo: ['', [Validators.required]]
  });

  formRegistro = this.fbuilder.nonNullable.record({
    nombre: ['', [
      Validators.required
    ]],
    apellido: ['', [
      Validators.required
    ]],
    email: ['', [
      Validators.required, 
      Validators.email
    ]],
    clave: ['', [
      Validators.required,
      ClaveValidaciones.longitudValidacion,
      MisValidaciones.espaciosValidacion
    ]],
    confirmacionClave: ['', [
      Validators.required,
      ClaveValidaciones.longitudValidacion,
      MisValidaciones.espaciosValidacion
    ]],
    edad: [0, [
      Validators.required,
      Validators.min(1)
    ]],
    dni: [0, [
      Validators.required,
      Validators.minLength(6)
    ]],
    especialidad: [{value: '', disabled: true}, [
      Validators.required,
      
    ]],
    obraSocial: [{value: '', disabled: true}, [
      Validators.required
    ]],
  },{
    validators: [ClaveValidaciones.confirmarClaveValidacion]
  });

  constructor(
    public dbusuarios: UsuariosService,
    public fbuilder: FormBuilder,
    public guardadoImagenes: ClaseStorage,
    public especialidadesService: EspecialidadesService
  ) {

    this.fTipousuario.controls.tipo.valueChanges.subscribe(r => {
      this.formRegistro.controls['especialidad'].reset({value: '', disabled: true});
      this.formRegistro.controls['obraSocial'].reset({value: '', disabled: true});
      if(r == 'paciente'){
        this.formRegistro.controls['obraSocial'].enable();
      }else if(r == 'especialista'){
        this.formRegistro.controls['especialidad'].enable();
      }
    });
  }

  RegistrarUsuario() {
    this.formRegistro.controls['confirmacionClave'].disable();
    let tipoUsr = this.fTipousuario.controls.tipo.value;
    if(tipoUsr && this.formRegistro.valid) {
      if (tipoUsr == 'paciente') {
        this.usuario = new Paciente(this.formRegistro.value);
      } else if(tipoUsr == 'especialista') {
        this.usuario = new Especialista(this.formRegistro.value);
      } else if(tipoUsr == 'admin'){
        this.usuario = new Usuario(this.formRegistro.value);
        this.usuario.tipoUsuario = 'admin'
      }
      this.dbusuarios.guardar(Object.assign({}, this.usuario), 'usuarios');
    }
    this.formRegistro.controls['confirmacionClave'].enable();
  }

  test(){
    console.log(this.fTipousuario.controls['tipo'])
  }

  botonPrueba() {
    this.fTipousuario.controls.tipo.setValue('paciente');
    this.formRegistro.setValue({
      nombre: "Martin",
      apellido: "Rigoberto",
      email: "rigomartin@gmail.com",
      clave: "misalud23",
      confirmacionClave: "misalud23",
      edad: 32,
      dni: 24338211,
      especialidad: '',
      obraSocial: 90000586837626
    });
  }

  botonPrueba2() {
    this.fTipousuario.controls.tipo.setValue('especialista');
    this.formRegistro.setValue({
      nombre: "John",
      apellido: "Gustavo",
      email: "johngus@gmail.com",
      clave: "eldoctor23",
      confirmacionClave: "eldoctor23",
      edad: 37,
      dni: 23382411,
      especialidad: 'clinica medica',
      obraSocial: ''
    });
  }

  subioArchivo(elementoHtml: HTMLInputElement){
    this.guardadoImagenes.subirArchivo(elementoHtml);
    console.log(443);
  }
}
