import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, collection, doc, query } from '@angular/fire/firestore';
import { ClaseFirestore } from 'src/app/clases/conexion-firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends ClaseFirestore{

  constructor( db: Firestore) { 
    super('usuarios', db);
  }

  override actualizar(objetoViejo: DocumentReference<DocumentData, DocumentData>, cambio: object): void {
    
  }
}
