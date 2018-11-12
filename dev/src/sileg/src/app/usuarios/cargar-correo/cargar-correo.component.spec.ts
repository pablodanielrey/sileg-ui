import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCorreoComponent } from './cargar-correo.component';

describe('CargarCorreoComponent', () => {
  let component: CargarCorreoComponent;
  let fixture: ComponentFixture<CargarCorreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarCorreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
