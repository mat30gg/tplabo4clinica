import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, updateDoc } from '@angular/fire/firestore'

export abstract class ClaseFirestore {

    public listaElementos: Array<any> = [];
    public coleccion: CollectionReference<any>

    constructor( path: string ,protected db: Firestore ){
        
        this.coleccion = collection(db, path);
        let observable = collectionData(this.coleccion);
        observable.subscribe( resp => {
            this.listaElementos = resp;
        });
    }

    guardar( nuevoObjeto: object){
        addDoc( this.coleccion, nuevoObjeto );
    }

    actualizar( objetoViejo: DocumentReference, cambio: object){
        updateDoc( objetoViejo, cambio );
    }
}