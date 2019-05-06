import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarPersonaComponent } from './seleccionar-persona.component';

describe('SeleccionarPersonaComponent', () => {
  let component: SeleccionarPersonaComponent;
  let fixture: ComponentFixture<SeleccionarPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
