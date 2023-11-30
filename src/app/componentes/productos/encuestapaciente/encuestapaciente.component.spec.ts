import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestapacienteComponent } from './encuestapaciente.component';

describe('EncuestapacienteComponent', () => {
  let component: EncuestapacienteComponent;
  let fixture: ComponentFixture<EncuestapacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestapacienteComponent]
    });
    fixture = TestBed.createComponent(EncuestapacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
