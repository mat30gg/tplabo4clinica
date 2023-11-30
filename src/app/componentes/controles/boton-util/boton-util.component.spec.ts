import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonUtilComponent } from './boton-util.component';

describe('BotonUtilComponent', () => {
  let component: BotonUtilComponent;
  let fixture: ComponentFixture<BotonUtilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotonUtilComponent]
    });
    fixture = TestBed.createComponent(BotonUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
