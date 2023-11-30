import { Component, Inject, Input } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
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
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/entidades/especialista';
import { Paciente } from 'src/app/clases/entidades/paciente';
import { Usuario } from 'src/app/clases/entidades/usuario';
import { ClaseStorage } from 'src/app/clases/firestorage/clase-storage';
import { ClaveValidaciones } from 'src/app/clases/validaciones/clave-validaciones';
import { MisValidaciones } from 'src/app/clases/validaciones/mis-validaciones';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';

import { UsuariosService } from 'src/app/servicios/firestore/usuarios.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  nusuario: any;
  tipoUsuario = '';
  @Input() menuAdmin: boolean = false;

  formRegistro = this.fbuilder.nonNullable.group({
    tipoUsuario: ['', [Validators.required]],
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
    edad: [null, [
      Validators.required,
      Validators.min(1)
    ]],
    dni: [null, [
      Validators.required,
      Validators.minLength(6)
    ]],
    obraSocial: [{value: '', disabled: true}, [
      Validators.required
    ]],
    especialidades: this.fbuilder.array([
    ]),
  },{
    validators: [ClaveValidaciones.confirmarClaveValidacion]
  });

  constructor(
    public dbusuarios: UsuariosService,
    public fbuilder: FormBuilder,
    public guardadoImagenes: ClaseStorage,
    public especialidadesService: EspecialidadesService,
    private ruter: Router,
    private authUsr: AutenticacionService,
    private db: Firestore
  ) {

    this.formRegistro.controls['tipoUsuario'].valueChanges.subscribe(r => {
      this.formRegistro.controls['especialidades'].reset();
      this.formRegistro.controls['obraSocial'].reset({value: '', disabled: true});
      if(r == 'paciente'){
        this.formRegistro.controls['obraSocial'].enable();
      }else if(r == 'especialista'){
        this.formRegistro.controls['especialidades'].enable();
      }
    });

    this.addControlEspecialidad();
  }

  RegistrarUsuario() {
    const colUsuarios = collection(this.db, 'usuarios');
    let usuarioValues = this.formRegistro.value;
    if( this.formRegistro.valid) {

      this.formRegistro.controls['confirmacionClave'].disable();
      let nDocUsuario = doc(colUsuarios, '/'+this.formRegistro.controls['email'].value);
      let nuevoUsuario = new Usuario(usuarioValues);
      let objetoUsr = {datos: Object.assign({}, nuevoUsuario), accesoHabilitado: true, emailVerificado: true};
      if(usuarioValues['tipoUsuario'] == 'paciente' ) objetoUsr.emailVerificado = false;
      setDoc(nDocUsuario, objetoUsr);

      //this.authUsr.login( nuevoUsuario );
      this.ruter.navigate(['/home']);
    }
  }

  subioArchivo(elementoHtml: HTMLInputElement){
    this.guardadoImagenes.subirArchivo(elementoHtml);
    console.log(443);
  }

  getControlesEspecialidades(){
    return (<FormArray>this.formRegistro.get('especialidades')).controls;
  }

  addControlEspecialidad(){
    const especialidades = this.formRegistro.get('especialidades') as FormArray;
    especialidades.push( this.crearControlEspecialidad() );
  }

  crearControlEspecialidad(){
    return this.fbuilder.control({
      value: '',
      disabled: false
    });
  }

  test(){
    console.log('resolvio');
  }
}
