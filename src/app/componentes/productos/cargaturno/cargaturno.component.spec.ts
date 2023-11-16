import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaturnoComponent } from './cargaturno.component';

describe('CargaturnoComponent', () => {
  let component: CargaturnoComponent;
  let fixture: ComponentFixture<CargaturnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargaturnoComponent]
    });
    fixture = TestBed.createComponent(CargaturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
