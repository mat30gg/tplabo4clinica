import { Component, Inject, Input } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
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
  ValidatorFn,
  ValidationErrors,
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

  public archivos: any = [];
  nusuario: any;
  tipoUsuario = '';
  listadoImagenes : Array<any> = []; 
  @Input() menuAdmin: boolean = false;

  

  formRegistro = this.fb.nonNullable.group({
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
    especialidades: this.fb.array([]),
    direccionimagenes: ['', []],
    recaptchaRegistro: [null, Validators.required]
  },{
    validators: [ClaveValidaciones.confirmarClaveValidacion]
  });

  constructor(
    public dbusuarios: UsuariosService,
    public fb: FormBuilder,
    public storage: Storage,
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
        this.formRegistro.addControl('especialidades', this.fb.array([]) );
        this.formRegistro.controls['especialidades'].enable();
        this.addControlEspecialidad();
      }
    });

    this.formRegistro.controls['email'].valueChanges.subscribe(r => {
      this.formRegistro.controls['direccionimagenes'].setValue( ref(storage).fullPath+'/'+r );
    })

    
  }

  RegistrarUsuario() {
    const colUsuarios = collection(this.db, 'usuarios');
    if( this.formRegistro.valid) {

      this.formRegistro.get(['confirmacionClave'])?.disable();
      this.formRegistro.get(['recaptchaRegistro'])?.disable();
      const usuarioValues = this.formRegistro.value;
      
      let nDocUsuario = doc(colUsuarios, '/'+this.formRegistro.controls['email'].value);
      let nuevoUsuario = new Usuario(usuarioValues);
      let objetoUsr = {datos: Object.assign({}, nuevoUsuario), accesoHabilitado: true, emailVerificado: true};
      if(usuarioValues['tipoUsuario'] == 'paciente' ) objetoUsr.emailVerificado = false;
      setDoc(nDocUsuario, objetoUsr);

      for(let i = 0; i < this.archivos.length; i++ ){
        const arch = this.archivos[i];
        console.log(arch);
        if(arch){
          const storageRef = ref(this.storage, nuevoUsuario.email+'/pfp'+i);
          uploadBytesResumable(storageRef, arch);
        }

       }

      //this.authUsr.login( nuevoUsuario );
      this.ruter.navigate(['/home']);
    }
  }

  subioArchivo(input: HTMLInputElement){
    if( !input.files) return
    
    this.archivos.push.apply( this.archivos, input.files );
    //this.archivos.push( input.files );

    console.log(this.archivos);
 
    
    let lector = new FileReader();
    lector.readAsDataURL(this.archivos[this.archivos.length - 1]);
    lector.onload = ( ev ) => { this.listadoImagenes.push(ev.target?.result) };

    
  }

  getControlesEspecialidades(){
    return (<FormArray>this.formRegistro.get('especialidades')).controls;
  }

  addControlEspecialidad(){
    const especialidades = this.formRegistro.get('especialidades') as FormArray;
    especialidades.push( this.crearControlEspecialidad() );
  }

  crearControlEspecialidad(){
    return this.fb.control({
      value: '',
      disabled: false
    }, [Validators.required]);
  }
  
}
