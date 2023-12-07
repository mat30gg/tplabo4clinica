import { Component, Input, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, getStorage, listAll, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { HistoriaclinicaService } from 'src/app/servicios/pdf/historiaclinica.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent {

  private pdfHistoriaServ = inject(HistoriaclinicaService);
  public usuario: any;
  public urlImagenesDPerfil: Array<any> = [];
  

  public horasDeTrabajo: Array<any> = [];

  constructor( public usrauth: AutenticacionService, public stg: Storage, public ruter: Router, public db: Firestore){ 

    
    for( let i = 0; i < 24; i++){
      this.horasDeTrabajo.push({hora: i, minuto: 0, disponible: false}, {hora: i, minuto: 30, disponible: false});
    }
  }

  obtenerUrlImg(){

    listAll( ref(this.stg, this.usuario.direccionimagenes) )
    .then( val => {
      val.items.forEach( el => {
        getDownloadURL( el )
        .then(url => {
          this.urlImagenesDPerfil.push(url)
        })
      })
    });

  }

  enClickHora(tiempo: any){
    let objtmp = this.horasDeTrabajo.find( val => val == tiempo);
    objtmp.disponible = !objtmp.disponible;
  }

  enClickDescargarHistoria(){
    this.pdfHistoriaServ.crearPdfHistoriaClinica( this.usuario );
  }

  ngOnDestroy(){
    if( this.usrauth.rol == 'especialista'){
      const docRef = doc( this.db, 'usuarios', this.usuario.email );
      updateDoc( docRef, 'datos.horasDeTrabajo', this.horasDeTrabajo)
    }
  }

  ngOnInit(){
    this.usuario = this.usrauth.usuario;
    this.obtenerUrlImg();

    if(this.usrauth.rol == 'especialista'){
      const docRef = doc( this.db, 'usuarios', this.usuario.email );
      docData( docRef ).subscribe( resp => { 
        this.horasDeTrabajo = resp!['datos']['horasDeTrabajo'];
      });
    }
  }

}
