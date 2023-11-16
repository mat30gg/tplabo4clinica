import { CollectionReference, DocumentData, DocumentReference, Firestore, Query, addDoc, collection, collectionData, collectionGroup, docData, getDoc, updateDoc } from '@angular/fire/firestore'

export abstract class ClaseFirestore {

    public pathRoot: string;
    public db: Firestore;
    public listaElementos: Array<any> = [];
    public coleccion: CollectionReference<any>;
    public coleccionDocs;


    constructor( path: string, db: Firestore ){
        this.db = db;
        this.pathRoot = path;
        this.coleccion = collection(db, path );
        this.coleccionDocs = collectionData(this.coleccion, {idField: 'id'});
        this.coleccionDocs.subscribe( resp => {
            this.listaElementos = resp;
        });
    }

    guardar( nuevoObjeto: object, nombreColeccion: string | CollectionReference){
        //addDoc( this.getColeccion( this.pathRoot + '/' + path ), nuevoObjeto );

        if( typeof nombreColeccion === 'object' && nombreColeccion instanceof CollectionReference){
            addDoc( nombreColeccion, nuevoObjeto);
        } else if( typeof nombreColeccion === 'string' ){
            addDoc( this.coleccion, nuevoObjeto);
        }
    }

    actualizar( objetoViejo: DocumentReference, cambio: object){
        updateDoc( objetoViejo, cambio );
    }

    getSubcolecciones( nombreColeccion: string = ''){
        //Validar que no es barra horizontal
        return collectionGroup(this.db, nombreColeccion);
        //return collection(this._db, this.pathRoot + pathColeccion? '/' + pathColeccion : '');
    }



}