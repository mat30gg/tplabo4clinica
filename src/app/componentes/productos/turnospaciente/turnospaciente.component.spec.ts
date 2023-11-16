import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnospacienteComponent } from './turnospaciente.component';

describe('TurnospacienteComponent', () => {
  let component: TurnospacienteComponent;
  let fixture: ComponentFixture<TurnospacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnospacienteComponent]
    });
    fixture = TestBed.createComponent(TurnospacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
