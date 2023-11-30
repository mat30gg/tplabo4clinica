import { Injectable } from '@angular/core';
import { Usuario } from '../clases/entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  public logueado:boolean = false;
  public rol:string;
  public usuario:any;

  constructor() { }

  public login( usr: Usuario){
    this.logueado = true;
    this.usuario = usr;
    this.rol = usr.tipoUsuario;
    return this;
  }

  public logout(){
    this.rol = "";
    this.logueado = false;
    this.usuario = null;
    return this;
  }

  public setAdmin(){
    if(this.logueado) this.rol = 'admin';
  }

  public setEspecialista(){
    if(this.logueado) this.rol = 'especialista';
  }

  public setPaciente(){
    if(this.logueado) this.rol = 'paciente';
  }
}
