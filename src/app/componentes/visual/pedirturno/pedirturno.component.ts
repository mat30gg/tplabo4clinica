import { Component } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Turno } from 'src/app/clases/entidades/turno';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { RegistrosService } from 'src/app/servicios/registros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedirturno',
  templateUrl: './pedirturno.component.html',
  styleUrls: ['./pedirturno.component.css']
})
export class PedirturnoComponent {

  public especialistaElegido : any;
  public especialidadElegida : any;
  public fechaElegida: Date;
  public nuevoTurno: Turno;

  constructor( public usrAuth: AutenticacionService, public db: Firestore, public ruter: Router, private logserv: RegistrosService) { }

  enClickEspecialista(especialista: object){
    this.especialistaElegido = especialista;
  }

  enClickEspecialidad(especialidad: any){
    this.especialidadElegida = especialidad;
  }

  enFechaElegida(fecha: Date){
    this.fechaElegida = fecha;
    this.pedirConfirmacion();
  }

  pedirConfirmacion(){
    Swal.fire({
      title: "Confirmar el turno",
      text: "Confirmar el turno con el doctor "+this.especialistaElegido['nombre']+" "+this.especialistaElegido['apellido']+". El "+this.fechaElegida.toLocaleString() +"?",
      showDenyButton: true,
      icon: 'question',
    }).then( val => {
      if(val.isConfirmed){
        this.nuevoTurno = new Turno(this.especialidadElegida, this.fechaElegida, Object.assign({}, this.especialistaElegido), Object.assign({}, this.usrAuth.usuario) );
        setDoc( doc( this.db, this.getPathNTurno(this.especialistaElegido['email']) ), Object.assign({}, this.nuevoTurno) );
        setDoc( doc( this.db, this.getPathNTurno(this.usrAuth.usuario['email']) ), Object.assign({}, this.nuevoTurno));
        setDoc( doc( this.db, 'turnos/'+this.fechaElegida?.getTime().toString() ), Object.assign({}, this.nuevoTurno));
        this.logserv.guardarRegistro('pedir_turno', {fecha: this.fechaElegida.toISOString(), especialidad: this.especialidadElegida, especialista: this.especialistaElegido.email, paciente: this.usrAuth.usuario.email})
        this.ruter.navigate(['/home']);
      }
    });
  }

  getPathNTurno(email: string){
    return this.pTurnos( email )+this.fechaElegida?.getTime().toString();
  }

  pTurnos(email: string){
    return 'usuarios/'+email+"/turnos/";
  }
}
