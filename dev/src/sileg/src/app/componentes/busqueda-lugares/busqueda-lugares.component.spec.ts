import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaLugaresComponent } from './busqueda-lugares.component';

describe('BusquedaLugaresComponent', () => {
  let component: BusquedaLugaresComponent;
  let fixture: ComponentFixture<BusquedaLugaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaLugaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
