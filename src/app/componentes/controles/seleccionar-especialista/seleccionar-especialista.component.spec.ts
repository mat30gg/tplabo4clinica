import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarEspecialistaComponent } from './seleccionar-especialista.component';

describe('SeleccionarEspecialistaComponent', () => {
  let component: SeleccionarEspecialistaComponent;
  let fixture: ComponentFixture<SeleccionarEspecialistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionarEspecialistaComponent]
    });
    fixture = TestBed.createComponent(SeleccionarEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
