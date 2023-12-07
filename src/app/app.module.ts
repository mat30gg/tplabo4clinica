import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { NavbarcompComponent } from './componentes/visual/navbarcomp/navbarcomp.component';
import { BienvenidaComponent } from './componentes/visual/bienvenida/bienvenida.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage} from '@angular/fire/storage'
import { NormalizarPipe } from './pipes/decorador/normalizar.pipe';
import { ClaseStorage } from './clases/firestorage/clase-storage';
import { UsuariosComponent } from './componentes/admin/usuarios/usuarios.component';
import { BotonesLoginComponent } from './componentes/dev/botones-login/botones-login.component';
import { MisturnosComponent } from './componentes/productos/misturnos/misturnos.component';
import { AutocompletartextoDirective } from './directivas/inputs/autocompletartexto.directive';
import { BarrasivacioPipe } from './pipes/validos/barrasivacio.pipe';
import { TurnospacienteComponent } from './componentes/productos/turnospaciente/turnospaciente.component';
import { TurnosespecialistaComponent } from './componentes/productos/turnosespecialista/turnosespecialista.component';
import { PacientePipe } from './pipes/transformacion/paciente.pipe';
import { EstadoTurnoDirective } from './directivas/decorado/estado-turno.directive';
import { TurnosComponent } from './componentes/admin/turnos/turnos.component';
import { CargaturnoComponent } from './componentes/productos/cargaturno/cargaturno.component';
import { MiperfilComponent } from './componentes/visual/miperfil/miperfil.component';
import { TablapaisesComponent } from './formularios/tablapaises/tablapaises.component';
import { PedirturnoComponent } from './componentes/visual/pedirturno/pedirturno.component';
import { SeleccionarEspecialistaComponent } from './componentes/controles/seleccionar-especialista/seleccionar-especialista.component';
import { SeleccionarEspecialidadComponent } from './componentes/controles/seleccionar-especialidad/seleccionar-especialidad.component';
import { BotonUtilComponent } from './componentes/controles/boton-util/boton-util.component';
import { ListadoUtilComponent } from './componentes/controles/listado-util/listado-util.component';
import { FiltroturnosComponent } from './componentes/controles/filtroturnos/filtroturnos.component';
import { VistaturnopacienteComponent } from './componentes/productos/misturnos/vistaturnopaciente/vistaturnopaciente.component';
import { VistaturnomedicoComponent } from './componentes/productos/misturnos/vistaturnomedico/vistaturnomedico.component';
import { EncuestapacienteComponent } from './componentes/productos/encuestapaciente/encuestapaciente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { SeleccionartipoComponent } from './componentes/registro/seleccionartipo/seleccionartipo.component';
import { TiempopipePipe } from './pipes/transformacion/tiempopipe.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupdatosfisicosComponent } from './componentes/controles/popupdatosfisicos/popupdatosfisicos.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { EstadisticasComponent } from './componentes/admin/estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarcompComponent,
    BienvenidaComponent,
    LoginComponent,
    RegistroComponent,
    NormalizarPipe,
    UsuariosComponent,
    BotonesLoginComponent,
    MisturnosComponent,
    AutocompletartextoDirective,
    BarrasivacioPipe,
    TurnospacienteComponent,
    TurnosespecialistaComponent,
    PacientePipe,
    EstadoTurnoDirective,
    TurnosComponent,
    CargaturnoComponent,
    MiperfilComponent,
    TablapaisesComponent,
    PedirturnoComponent,
    SeleccionarEspecialistaComponent,
    SeleccionarEspecialidadComponent,
    BotonUtilComponent,
    ListadoUtilComponent,
    FiltroturnosComponent,
    VistaturnopacienteComponent,
    VistaturnomedicoComponent,
    EncuestapacienteComponent,
    SeleccionartipoComponent,
    TiempopipePipe,
    PopupdatosfisicosComponent,
    PacientesComponent,
    EstadisticasComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp({"projectId":"tp-clinica-ce784","appId":"1:69946792691:web:5bcf2a05ad4b46ef727586","storageBucket":"tp-clinica-ce784.appspot.com","apiKey":"AIzaSyCAz7HkPbZlPD5pjdf9nMQoYjih7SWcaec","authDomain":"tp-clinica-ce784.firebaseapp.com","messagingSenderId":"69946792691"})),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    NgbModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [ClaseStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
