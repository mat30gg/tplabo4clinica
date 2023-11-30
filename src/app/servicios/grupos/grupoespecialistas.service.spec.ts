import { TestBed } from '@angular/core/testing';

import { GrupoespecialistasService } from './grupoespecialistas.service';

describe('GrupoespecialistasService', () => {
  let service: GrupoespecialistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoespecialistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
