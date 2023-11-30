import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaturnopacienteComponent } from './vistaturnopaciente.component';

describe('VistaturnopacienteComponent', () => {
  let component: VistaturnopacienteComponent;
  let fixture: ComponentFixture<VistaturnopacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaturnopacienteComponent]
    });
    fixture = TestBed.createComponent(VistaturnopacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
