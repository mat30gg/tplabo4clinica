import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[estadoTurno]'
})
export class EstadoTurnoDirective {
  @Input() estadoTurno = '';

  constructor(private el: ElementRef) { 
    if(this.estadoTurno == 'pendiente')
    this.el.nativeElement.style.backgroundColor = this.estadoTurno;
  }
}
