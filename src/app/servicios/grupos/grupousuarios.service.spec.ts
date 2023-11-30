import { TestBed } from '@angular/core/testing';

import { GrupousuariosService } from './grupousuarios.service';

describe('GrupousuariosService', () => {
  let service: GrupousuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupousuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
