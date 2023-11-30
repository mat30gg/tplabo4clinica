import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablapaisesComponent } from './tablapaises.component';

describe('TablapaisesComponent', () => {
  let component: TablapaisesComponent;
  let fixture: ComponentFixture<TablapaisesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablapaisesComponent]
    });
    fixture = TestBed.createComponent(TablapaisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
