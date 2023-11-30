import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { UsuariosService } from '../firestore/usuarios.service';
import { GrupousuariosService } from './grupousuarios.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoespecialistasService {

  public listadoEspecialistas: Array<any> = [];
  
  constructor( private db: Firestore, private usrs: GrupousuariosService ) { 
    collectionData(usrs.coleccionUsuarios)
    .subscribe( resp => {
      this.listadoEspecialistas = resp.filter( u => { return (u?.['datos'].tipoUsuario === 'especialista' && u?.['accesoHabilitado']) });
    })
  }
}
