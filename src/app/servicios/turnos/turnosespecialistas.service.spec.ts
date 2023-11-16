import { TestBed } from '@angular/core/testing';

import { TurnosespecialistasService } from './turnosespecialistas.service';

describe('TurnosespecialistasService', () => {
  let service: TurnosespecialistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnosespecialistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
