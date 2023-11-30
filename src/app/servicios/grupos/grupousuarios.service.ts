import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GrupousuariosService {

  public listadoUsuarios : Array<any> = [];
  public coleccionUsuarios: CollectionReference;

  constructor( db: Firestore) { 
    this.coleccionUsuarios = collection(db, 'usuarios');
    collectionData( this.coleccionUsuarios ).subscribe( resp => { 
      this.listadoUsuarios = resp 
    });
  }
}
