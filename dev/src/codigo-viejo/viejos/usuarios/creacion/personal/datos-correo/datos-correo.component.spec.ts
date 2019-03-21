import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCorreoComponent } from './datos-correo.component';

describe('DatosCorreoComponent', () => {
  let component: DatosCorreoComponent;
  let fixture: ComponentFixture<DatosCorreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosCorreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
