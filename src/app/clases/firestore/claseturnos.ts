import { Firestore, collection, collectionData, collectionGroup, collectionSnapshots } from "@angular/fire/firestore";
import { ClaseFirestore } from "../conexion-firestore";
import { firebaseApp$ } from "@angular/fire/app";

export class Claseturnos extends ClaseFirestore {

    listadoTurnos: Array<any> = [];

    constructor( path: string, db: Firestore){
        super(path, db);
    }

    turnosDeUsuario(email: string){

        let colPath = this.coleccion.path + '/' + email + '/turnos';
        let colReference = collection(this.db, colPath)
        collectionSnapshots( colReference ).subscribe( e => {
          e.forEach( doc => {
            this.listadoTurnos.push( doc.data() );
          })
        })
    }

      todosLosTurnos(){
        let colReference = collection( this.db , 'turnos');
        collectionData( colReference, {idField: 'idturno'} ).subscribe( resp => {
          console.log(resp);
          this.listadoTurnos = resp;
        })
    }
}
