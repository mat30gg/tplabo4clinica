import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupdatosfisicosComponent } from './popupdatosfisicos.component';

describe('PopupdatosfisicosComponent', () => {
  let component: PopupdatosfisicosComponent;
  let fixture: ComponentFixture<PopupdatosfisicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupdatosfisicosComponent]
    });
    fixture = TestBed.createComponent(PopupdatosfisicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
