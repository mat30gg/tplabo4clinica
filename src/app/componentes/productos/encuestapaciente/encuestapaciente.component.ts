import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuestapaciente',
  templateUrl: './encuestapaciente.component.html',
  styleUrls: ['./encuestapaciente.component.css']
})
export class EncuestapacienteComponent {

  @Output() envioEncuesta = new EventEmitter<any>();
  constructor( public fb: FormBuilder ){ }

  public encuesta = this.fb.group({
    sugerencia: ['', []],
    puntaje: [0, [Validators.min(1)]],
    primeravez: [true, [Validators.required]],
    diagnosticorapido: [false, []],
    atencionprofesional: [false, []],
    tratodelpersonal: [false, []],
    higienico: [false, []],
    probabilidadvuelta: [50, []]
  })

  enviarFormulario(){
    if(this.encuesta.valid){
      this.envioEncuesta.emit( this.encuesta.value );
    }
  }


}
