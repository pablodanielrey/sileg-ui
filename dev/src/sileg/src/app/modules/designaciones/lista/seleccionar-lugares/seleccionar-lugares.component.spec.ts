import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarLugaresComponent } from './seleccionar-lugares.component';

describe('SeleccionarLugaresComponent', () => {
  let component: SeleccionarLugaresComponent;
  let fixture: ComponentFixture<SeleccionarLugaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarLugaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
