import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirturnoComponent } from './pedirturno.component';

describe('PedirturnoComponent', () => {
  let component: PedirturnoComponent;
  let fixture: ComponentFixture<PedirturnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedirturnoComponent]
    });
    fixture = TestBed.createComponent(PedirturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
