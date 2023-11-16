import { TestBed } from '@angular/core/testing';

import { TurnospacientesService } from './turnospacientes.service';

describe('TurnospacientesService', () => {
  let service: TurnospacientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnospacientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
