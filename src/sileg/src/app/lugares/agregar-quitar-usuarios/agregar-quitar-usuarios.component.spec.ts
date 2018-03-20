import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarQuitarUsuariosComponent } from './agregar-quitar-usuarios.component';

describe('AgregarQuitarUsuariosComponent', () => {
  let component: AgregarQuitarUsuariosComponent;
  let fixture: ComponentFixture<AgregarQuitarUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarQuitarUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarQuitarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
