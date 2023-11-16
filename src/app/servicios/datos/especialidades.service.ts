import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor() { }

  get especialidades(){
    return EspecialidadesService._especialidades;
}
  private static _especialidades: Array<string> = ['cardiologia', 'cirugia', 'dermatologia', 'clinica medica', 'endocrinologia', 'gastroenterologia', 'geriatria', 'ginecologia', 'hematologia', 'pediatria', 'infectologia', 'medicina nuclear', 'neurologia', 'oftalmologia', 'psicologia']
}
