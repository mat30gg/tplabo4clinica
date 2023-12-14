import { Component, inject, Renderer2 } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { HistoriaclinicaService } from 'src/app/servicios/pdf/historiaclinica.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  private pdfHistoriaServ = inject( HistoriaclinicaService );
  public especialistas: Array<any> = [];
  public pacientes: Array<any> = [];

  constructor(public db: Firestore, private rend: Renderer2) {
    collectionData( collection(this.db, 'usuarios') ).subscribe( resp => {
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

  descargarExcel() {
    getDocs( collection(this.db, 'usuarios') ).then( val => {
      let datosPersonas: any[] = [];
      val.forEach( docusuario => {
        // const usuarioJson = JSON.stringify(docusuario.data());
        datosPersonas.push(docusuario.data()['datos'] );
      })
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet( datosPersonas );
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
      XLSX.writeFile(wb, 'usuarios.xlsx');
    })
  }
}
