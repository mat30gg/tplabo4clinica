import { Component, TemplateRef } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popupdatosfisicos',
  templateUrl: './popupdatosfisicos.component.html',
  styleUrls: ['./popupdatosfisicos.component.css']
})
export class PopupdatosfisicosComponent {

  constructor(public fb: FormBuilder, public modalActivo: NgbActiveModal){ 
    
  }

  formDatosEstaticos = this.fb.group({
    comentario: ['', [Validators.required]],
    altura: [0, [Validators.required]],
    peso: [0, [Validators.required]],
    temperatura: [0, [Validators.required]],
    presion: [0, [Validators.required]]
  });

  formDatosDinamicos = this.fb.array<FormGroup>([
  ])

  formDatosFisicos = this.fb.group({
    datosEstaticos: this.formDatosEstaticos,
    datosDinamicos: this.formDatosDinamicos
  })

  fdd_enClickAgregarDato(){
    this.formDatosDinamicos.push( this.fdd_crearControlDato() )
  }

  fdd_enClickRemoverDato(){
    this.formDatosDinamicos.removeAt( -1 );
  }

  fdd_crearControlDato(){
    return this.fb.group({
      clave: ['', []],
      valor: ['', []]
    })
  }

  fdf_enClickEnviarDatos(){
    // const objDatosDinamicos: any = {};
    // this.formDatosFisicos.get('datosDinamicos')?.value.forEach( val => {
    //   objDatosDinamicos[val['clave']] = val['valor'];
    // });
    //const objDatosDinamicos = this.formDatosFisicos.get('datosDinamicos')?.value;
    //console.log(this.formDatosFisicos.value)

    //let datosDelaPersona = { ...this.formDatosFisicos.get('datosEstaticos')?.value, ...objDatosDinamicos };

    this.modalActivo.close( { ...this.formDatosFisicos.value, fechaEmision: new Date().toISOString() } );
  }

  controlesDD(): any{
    return (<FormArray>this.formDatosFisicos.controls['datosDinamicos']).controls ;
  }

  tst(val: any){
    console.log(val)
  }
}
