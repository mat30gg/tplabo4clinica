import { Component} from '@angular/core';
import { CollectionReference, Firestore, QueryDocumentSnapshot, Timestamp, addDoc, collection, collectionChanges, collectionData, collectionGroup, doc, docData, docSnapshots, getDoc, getDocs, setDoc, snapToData, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css']
})
export class MisturnosComponent {

  public ocultarEncuesta = true;
  public colTurnos;
  public listadoTurnos: Array<any> = [];
  public listadoMostrar: Array<any> = [];

  constructor( public usrauth: AutenticacionService, public db: Firestore ){
    if(usrauth.rol == 'admin'){
      collectionData( collection(this.db, 'turnos'), {idField: 'codturno'} ).subscribe( resp => {
        this.listadoTurnos = resp;
        this.listadoMostrar = this.listadoTurnos;
      });
    }else{
      this.colTurnos = collection(this.db, this.getPathTurnos(this.usrauth.usuario['email']) );
      collectionData( this.colTurnos, {idField: 'codturno'} ).subscribe( resp => {
      this.listadoTurnos = resp;
      this.listadoMostrar = this.listadoTurnos;
      })
    }
  }

  getPathTurnos(email: string){
    return 'usuarios/'+email+'/turnos/';
  }

  enCambioFiltros(listaF: any ){
    this.listadoMostrar = listaF;
  }

  setearTurno( turno: any ){
    setDoc(doc(this.db, this.getPathTurnos(turno.datosPaciente['email'])+turno.codturno), turno);
    setDoc(doc(this.db, this.getPathTurnos(turno.datosEspecialista['email'])+turno.codturno), turno);
  }

  enClickCancelar(turno: any){
    Swal.fire({
      title: "Porque se cancelo el turno?",
      text: "Dejar un comentario al respecto",
      input: 'text',
      allowOutsideClick: false,
      showCancelButton: true
    }).then( resp => { 
      if(resp.isConfirmed){
        turno.estado = 'cancelado';
        turno.comentarios = (turno.comentarios??'') + '\nRazon de cancelacion: ' + resp.value;
        this.setearTurno(turno);
      }
    });
  }

  enClickVerResenia(turno: any){
    Swal.fire({
      title: "Comentarios",
      text: turno.comentarios??''
    });
  }

  enClickCompletarEncuesta(turno: any){
    this.ocultarEncuesta = false;
    turno.encuestarealizada = true;
    this.setearTurno(turno);
  }

  enEnvioEncuesta(resultados: object){
    this.ocultarEncuesta = true;
    let colEncuestas = collection(this.db, 'encuestas');
    addDoc( colEncuestas, resultados );
  }

  enClickCalificarAtencion(turno: any){
    Swal.fire({
      title: "Calificar la atencion",
      text: "Deje una calificacion sobre el servicio",
      input: 'text',
      allowOutsideClick: false
    }).then( resp => { 
      if(resp.isConfirmed){
        turno.comentarios = (turno.comentarios??'') + '\nCalificacion: ' + resp.value;
        this.setearTurno(turno);
      }
    });
  }

  enClickRechazarTurno(turno: any){
    Swal.fire({
      title: "Porque se rechazo el turno?",
      text: "Dejar un comentario al respecto",
      input: 'text',
      allowOutsideClick: false,
      showCancelButton: true
    }).then( resp => { 
      if(resp.isConfirmed){
        turno.estado = 'rechazado';
        turno.comentarios = (turno.comentarios??'') + '\nRazon de rechazo: ' + resp.value;
        this.setearTurno(turno);
      }
    });
  }

  enClickFinalizarTurno(turno: any){
    Swal.fire({
      title: "Finalizo el turno",
      text: "Dar un comentario y el diagnostico de la visita",
      input: 'text',
      allowOutsideClick: false,
    }).then( resp => { 
      if(resp.isConfirmed){
        turno.estado = 'finalizado';
        turno.comentarios = (turno.comentarios??'') + '\nDiagnostico de la visita: ' + resp.value;
        this.setearTurno(turno);
      }
    });
  }

  enClickAceptarTurno(turno: any){
    turno.estado = 'aceptado';
    this.setearTurno(turno);
  }
}
