import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Claseturnos } from 'src/app/clases/firestore/claseturnos';

@Injectable({
  providedIn: 'root'
})
export class TurnospacientesService extends Claseturnos{
  
  constructor(db: Firestore) { 
    super('pacientes', db);
  }

}
