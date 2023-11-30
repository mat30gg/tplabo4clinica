import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUtilComponent } from './listado-util.component';

describe('ListadoUtilComponent', () => {
  let component: ListadoUtilComponent;
  let fixture: ComponentFixture<ListadoUtilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoUtilComponent]
    });
    fixture = TestBed.createComponent(ListadoUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
