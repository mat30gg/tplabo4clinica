import { TestBed } from '@angular/core/testing';

import { ManejoturnosService } from './manejoturnos.service';

describe('ManejoturnosService', () => {
  let service: ManejoturnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejoturnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
