import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { HistoriaclinicaService } from 'src/app/servicios/pdf/historiaclinica.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  private pdfHistoriaServ = inject( HistoriaclinicaService );
  public especialistas: Array<any> = [];
  public pacientes: Array<any> = [];

  constructor(public db: Firestore) {
    collectionData( collection(this.db, 'usuarios') ).subscribe( resp => {
      console.log(resp);
      this.especialistas = resp.filter( val => {
        return val['datos'].tipoUsuario == 'especialista';
      });
      this.pacientes = resp.filter( val => {
        return val['datos'].tipoUsuario == 'paciente';
      })
    })

  }

  AlternarHabilitado(doctor: any){
    doctor.accesoHabilitado = !doctor.accesoHabilitado;
    updateDoc( doc(this.db, 'usuarios', doctor.datos.email ), doctor);
  }

  descargarHistoriaClinica( paciente: any ){
    this.pdfHistoriaServ.crearPdfHistoriaClinica( paciente.datos );
  }
}
