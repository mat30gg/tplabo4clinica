import { TestBed } from '@angular/core/testing';

import { HistoriaclinicaService } from './historiaclinica.service';

describe('HistoriaclinicaService', () => {
  let service: HistoriaclinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriaclinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
