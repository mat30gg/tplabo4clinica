import { Component, Input, SimpleChanges } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { Usuario } from 'src/app/clases/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-navbarcomp',
  templateUrl: './navbarcomp.component.html',
  styleUrls: ['./navbarcomp.component.css']
})
export class NavbarcompComponent {
  @Input() usuarioLog : any;
  public urlImagenPerfil: any = '';

  constructor(public authlog: AutenticacionService, public stg: Storage ){ 
  }

  cerrarSesion(){
    this.authlog.logout();
  }

  ngOnChanges(cambios: SimpleChanges){
    if(cambios['usuarioLog'].currentValue ){
      let urlimgs = this.usuarioLog.direccionimagenes??'';
      if( urlimgs ){
        getDownloadURL( ref( this.stg, urlimgs + '/pfp0' ) ).then( urld => {
          this.urlImagenPerfil = urld;
        })
      } else {
        this.urlImagenPerfil = 'assets/defaultusr.jpg';
      }
    }
  }
}
