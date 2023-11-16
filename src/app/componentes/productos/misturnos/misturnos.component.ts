import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CollectionReference, Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css']
})
export class MisturnosComponent {

  constructor( public usrAutenticado: AutenticacionService){}
}
