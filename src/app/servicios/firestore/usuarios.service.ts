import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, collection, collectionData, doc, query } from '@angular/fire/firestore';
import { ClaseFirestore } from 'src/app/clases/conexion-firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService{

  public listadoUsuarios : Array<any> = [];
  constructor( db: Firestore) { 
    const coleccionUsuarios = collection(db, 'usuarios');
    collectionData( coleccionUsuarios ).subscribe( resp => { this.listadoUsuarios = resp });
  }
}
