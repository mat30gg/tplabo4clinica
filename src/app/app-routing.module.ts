import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BienvenidaComponent } from './componentes/visual/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosComponent } from './componentes/admin/usuarios/usuarios.component';
import { logueadoGuard } from './guards/logueado.guard';
import { MisturnosComponent } from './componentes/productos/misturnos/misturnos.component';
import { TurnosComponent } from './componentes/admin/turnos/turnos.component';
import { CargaturnoComponent } from './componentes/productos/cargaturno/cargaturno.component';
import { MiperfilComponent } from './componentes/visual/miperfil/miperfil.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: BienvenidaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'usuarios', component: UsuariosComponent, canActivate: [logueadoGuard], data: {rolEsperado: 'admin'}},
  {path: 'misturnos', component: MisturnosComponent, canActivate: [logueadoGuard]},
  {path: 'turnos', component: TurnosComponent, canActivate: [logueadoGuard], data: {rolEsperado: 'admin'}},
  {path: 'solicitarturno', component: CargaturnoComponent, canActivate: []},
  {path: 'miperfil', component: MiperfilComponent, canActivate: [logueadoGuard]},
  {path: '**', redirectTo: '/home' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
