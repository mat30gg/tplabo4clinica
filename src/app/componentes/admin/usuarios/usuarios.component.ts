import { Component } from '@angular/core';
import { collectionChanges, collectionData } from '@angular/fire/firestore';
import { UsuariosService } from 'src/app/servicios/firestore/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  public especialistas: Array<any> = [];

  constructor(public dbusuarios: UsuariosService) {
    
    this.especialistas = dbusuarios.listaElementos.filter( pers => {
      return (pers.tipoUsuario == 'especialista')
    });
  }

  AlternarHabilitado(doc: any){
    doc.aprobado = !doc.aprobado;
  }
}
