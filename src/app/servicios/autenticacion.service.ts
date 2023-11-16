import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  public logueado:boolean = false;
  public rol:string = 'paciente'; // <- Borrar
  public usuario:any = {email: 'rigomartin@gmail.com'}; // <- Borrar

  constructor() { }

  public login(){
    this.logueado = true;
    
    return this;
  }

  public logout(){
    this.logueado = false;
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

  public setPlebeyo(){
    if(this.logueado) this.rol = 'plebeyo';
  }
}
