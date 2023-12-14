import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {


  private colregistros : any;
  

  public espeCant: Array<any> = [];
  public fechaCant: Array<any> = [];
  public loginRegistros: Array<any> = [];
  public finTurnoRegistros: Array<any> = [];
  public solicitudEspecialistaCant: Array<any> = [];
  public finEspecialistaCant: Array<any> = [];

  constructor( private db: Firestore) { 

    this.colregistros = collection( this.db, 'logs');

    collectionData( this.colregistros ).subscribe( resp => {
      console.time('servicio registros')
      let registrosPedirTurno: Array<any> = [];
      resp.forEach( val => {
        if(val['tipo'] == "pedir_turno") {
          registrosPedirTurno.push( val );
        }
        if(val['tipo'] == "login") {
          this.loginRegistros.push(val)
        }
        if(val['tipo'] == "fin_turno") {
          this.finTurnoRegistros.push(val)
        }
      })
      
      registrosPedirTurno.forEach( elem => {
        let especialidadLog = elem['detalle']['especialidad'];
        let indice = this.espeCant.findIndex( val => val.name == especialidadLog )
        if( indice != -1 ){
          this.espeCant[indice].y += 1;
        }else{
          this.espeCant.push( {name: especialidadLog, y: 1})
        }
      })

      registrosPedirTurno.forEach( elem => {
        let fechaLog = new Date( elem['detalle']['fecha'] );
        let indice = this.fechaCant.findIndex( val => val.name == fechaLog.toDateString() )
        if( indice != -1 ){
          this.fechaCant[indice].y += 1;
        }else{
          this.fechaCant.push( {name: fechaLog.toDateString(), y: 1})
        }
      })


      let hoy = new Date();
      let maniana = new Date();
      maniana.setDate( hoy.getDate() + 5 );
      let pasadomaniana = new Date();
      pasadomaniana.setDate( maniana.getDate() + 5 );
      

      registrosPedirTurno.forEach( elem => {
        let fechaLog = new Date( elem['detalle']['fecha'] );
        if( fechaLog > maniana && fechaLog <= pasadomaniana ) {
          let indice = this.solicitudEspecialistaCant.findIndex( val => val.name == elem['detalle']['especialista'] );
          if( indice != -1 ){
            this.solicitudEspecialistaCant[indice].y += 1;
          }else{
            this.solicitudEspecialistaCant.push( {name: elem['detalle']['especialista'] , y: 1})
          }
        }
      })
      console.log(registrosPedirTurno);

      this.finTurnoRegistros.forEach( elem => {
        let fechaLog = new Date( elem['detalle']['fecha_fin'] );
        if(  fechaLog <= pasadomaniana ) {
          let indice = this.finEspecialistaCant.findIndex( val => val.name == elem['detalle']['especialista'] );
          if( indice != -1 ){
            this.finEspecialistaCant[indice].y += 1;
          }else{
            this.finEspecialistaCant.push( {name: elem['detalle']['especialista'] , y: 1})
          }
        }
      })
      console.timeEnd('servicio registros');

    })
  }

  public guardarRegistro( tipo: string, detalle: object){
    addDoc( this.colregistros, { tipo: tipo, detalle: detalle, momentoRegistro: new Date().toISOString() } );
  }

}
