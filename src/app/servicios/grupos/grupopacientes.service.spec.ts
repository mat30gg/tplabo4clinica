import { TestBed } from '@angular/core/testing';

import { GrupopacientesService } from './grupopacientes.service';

describe('GrupopacientesService', () => {
  let service: GrupopacientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupopacientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
