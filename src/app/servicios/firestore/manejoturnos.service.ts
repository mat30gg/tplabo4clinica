import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, collectionGroup } from '@angular/fire/firestore';
import { ClaseFirestore } from 'src/app/clases/conexion-firestore';
import { Turno } from 'src/app/clases/entidades/turno';

@Injectable({
  providedIn: 'root'
})
export class ManejoturnosService{

  constructor( public db: Firestore) { }

  agregarTurno( turno: Turno){
    addDoc( collection(this.db, 'turnos'), turno);
    addDoc( collection(this.db, 'especialistas/'+turno.especialistaTurno.email+'/turnos'), turno);
    addDoc( collection(this.db, 'pacientes/'+turno.pacienteTurno.email+'/turnos'), turno);
  }
}
