import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosPorOficinaComponent } from './usuarios-por-oficina.component';

describe('UsuariosPorOficinaComponent', () => {
  let component: UsuariosPorOficinaComponent;
  let fixture: ComponentFixture<UsuariosPorOficinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosPorOficinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosPorOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
