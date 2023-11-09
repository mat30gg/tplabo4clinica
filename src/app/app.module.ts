import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { UsuariosComponent } from './componentes/usuarios/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarcompComponent,
    BienvenidaComponent,
    LoginComponent,
    RegistroComponent,
    NormalizarPipe,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"tp-clinica-ce784","appId":"1:69946792691:web:5bcf2a05ad4b46ef727586","storageBucket":"tp-clinica-ce784.appspot.com","apiKey":"AIzaSyCAz7HkPbZlPD5pjdf9nMQoYjih7SWcaec","authDomain":"tp-clinica-ce784.firebaseapp.com","messagingSenderId":"69946792691"})),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [ClaseStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
