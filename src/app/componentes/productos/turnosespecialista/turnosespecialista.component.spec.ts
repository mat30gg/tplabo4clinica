import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosespecialistaComponent } from './turnosespecialista.component';

describe('TurnosespecialistaComponent', () => {
  let component: TurnosespecialistaComponent;
  let fixture: ComponentFixture<TurnosespecialistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnosespecialistaComponent]
    });
    fixture = TestBed.createComponent(TurnosespecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
