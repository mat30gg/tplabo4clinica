import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaturnomedicoComponent } from './vistaturnomedico.component';

describe('VistaturnomedicoComponent', () => {
  let component: VistaturnomedicoComponent;
  let fixture: ComponentFixture<VistaturnomedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaturnomedicoComponent]
    });
    fixture = TestBed.createComponent(VistaturnomedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
