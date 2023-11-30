import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroturnosComponent } from './filtroturnos.component';

describe('FiltroturnosComponent', () => {
  let component: FiltroturnosComponent;
  let fixture: ComponentFixture<FiltroturnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroturnosComponent]
    });
    fixture = TestBed.createComponent(FiltroturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
