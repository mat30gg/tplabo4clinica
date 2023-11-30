import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  private _lista: Array<string> = ['cardiologia', 'cirugia', 'dermatologia', 'clinica medica', 'endocrinologia', 'gastroenterologia', 'geriatria', 'ginecologia', 'hematologia', 'pediatria', 'infectologia', 'medicina nuclear', 'neurologia', 'oftalmologia', 'psicologia'];

  
  public get lista() : Array<string> {
    return this._lista;
  }
  
  constructor() { }
}
