import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarLugaresComponent } from './buscar-lugares.component';

describe('BuscarLugaresComponent', () => {
  let component: BuscarLugaresComponent;
  let fixture: ComponentFixture<BuscarLugaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarLugaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
