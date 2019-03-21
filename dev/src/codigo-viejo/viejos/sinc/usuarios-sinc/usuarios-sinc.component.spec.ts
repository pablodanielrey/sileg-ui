import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosSincComponent } from './usuarios-sinc.component';

describe('UsuariosSincComponent', () => {
  let component: UsuariosSincComponent;
  let fixture: ComponentFixture<UsuariosSincComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosSincComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosSincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
