import { Component } from '@angular/core';
import { collectionChanges, collectionData } from '@angular/fire/firestore';
import { UsuariosService } from 'src/app/servicios/firestore/usuarios.service';
import { GrupoespecialistasService } from 'src/app/servicios/grupos/grupoespecialistas.service';
import { GrupousuariosService } from 'src/app/servicios/grupos/grupousuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  public especialistas: Array<any> = [];

  constructor(public dbespecialistas: GrupoespecialistasService) {
    
    this.especialistas = dbespecialistas.listadoEspecialistas;
  }

  AlternarHabilitado(doc: any){
    doc.aprobado = !doc.aprobado;
  }
}
