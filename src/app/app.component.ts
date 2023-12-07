import { Component } from '@angular/core';
import { AutenticacionService } from './servicios/autenticacion.service';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './animaciones';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {

  title = 'tp-clinica';

  constructor(public authserv : AutenticacionService , private contexts: ChildrenOutletContexts ) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
