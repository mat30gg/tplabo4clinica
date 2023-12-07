import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionartipoComponent } from './seleccionartipo.component';

describe('SeleccionartipoComponent', () => {
  let component: SeleccionartipoComponent;
  let fixture: ComponentFixture<SeleccionartipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionartipoComponent]
    });
    fixture = TestBed.createComponent(SeleccionartipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
