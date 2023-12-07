import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { GrupousuariosService } from './grupousuarios.service';

@Injectable({
  providedIn: 'root'
})
export class GrupopacientesService {

  public listadoEspecialistas: Array<any> = [];
  
  constructor( private db: Firestore, private usrs: GrupousuariosService ) { 
    collectionData(usrs.coleccionUsuarios)
    .subscribe( resp => {
      this.listadoEspecialistas = resp.filter( u => { return (u?.['datos'].tipoUsuario === 'paciente' && u?.['accesoHabilitado']) });
    })
  }
}
