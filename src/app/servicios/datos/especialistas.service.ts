import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {

  public listadoEspecialistas: Array<any> = [];

  constructor( db: Firestore ) { 
    let colRef = collection(db, 'especialistas');
    collectionData( colRef ).subscribe( resp => {
      this.listadoEspecialistas = resp;
    })
  }
}
