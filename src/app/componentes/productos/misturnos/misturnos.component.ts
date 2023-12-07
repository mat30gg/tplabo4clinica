import { Component, inject} from '@angular/core';
import { CollectionReference, Firestore, QueryDocumentSnapshot, Timestamp, addDoc, collection, collectionChanges, collectionData, collectionGroup, doc, docData, docSnapshots, getDoc, getDocs, setDoc, snapToData, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';
import Swal from 'sweetalert2';
import { PopupdatosfisicosComponent } from '../../controles/popupdatosfisicos/popupdatosfisicos.component';
import { RegistrosService } from 'src/app/servicios/registros.service';

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css']
})
export class MisturnosComponent {

  private modalServ = inject(NgbModal);
  public ocultarEncuesta = true;
  public colTurnos;
  public listadoTurnos: Array<any> = [];
  public listadoMostrar: Array<any> = [];

  constructor( public usrauth: AutenticacionService, public db: Firestore, private logserv: RegistrosService ){
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
    console.log(turno);
    Swal.fire({
      title: "Finalizo el turno",
      text: "Dar un comentario de la visita",
      input: 'text',
      allowOutsideClick: false,
    }).then( 
      resp => 
      { 
        if(resp.isConfirmed)
        {
          this.logserv.guardarRegistro('fin_turno', {fecha_fin: new Date().toISOString(), especialista: turno.datosEspecialista.email, especialidad: turno.especialidad, paciente: turno.datosPaciente.email})
          turno.estado = 'finalizado';
          turno.comentarios = (turno.comentarios??'') + ' Comentario de la visita: ' + resp.value;
          this.setearTurno(turno);

          this.modalServ.open(PopupdatosfisicosComponent).result.then( 
          popresp => 
          {
            const emailPaciente = turno.datosPaciente.email;
            setDoc( doc(this.db, 'usuarios', emailPaciente, 'historialclinico', turno.codturno), popresp ).catch( err => {console.log(err)})
          })
        }
    })
  }

  enClickAceptarTurno(turno: any){
    turno.estado = 'aceptado';
    this.setearTurno(turno);
  }
}
