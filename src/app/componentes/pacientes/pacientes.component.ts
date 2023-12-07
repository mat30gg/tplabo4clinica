import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { HistoriaclinicaService } from 'src/app/servicios/pdf/historiaclinica.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {
  private pdfHistoriaMedica = inject( HistoriaclinicaService )
  public listaPacientes: Array<any> = [];

  constructor(private db: Firestore, private usrlog: AutenticacionService){}

  ngOnInit(){
    collectionData( collection( this.db, 'turnos' ) ).subscribe(
      
      resp => {


        this.listaPacientes = resp
        .filter( item => { return item['datosEspecialista'].email == this.usrlog.usuario.email })
        .map( val => { return val['datosPaciente'] }) 

        // TODO Sacar valores repetidos

        console.log(this.listaPacientes)


      }
    )

  }

  enClickDescargarHistoriaClinica( paciente: any){
    this.pdfHistoriaMedica.crearPdfHistoriaClinica( paciente )
  }
}
