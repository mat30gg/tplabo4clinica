import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';

export const logueadoGuard: CanActivateFn = (route, state) => {
  const rol = route.data['rolEsperado'];
  const auth = inject(AutenticacionService);
  return (auth.logueado && auth.rol == rol)
};
