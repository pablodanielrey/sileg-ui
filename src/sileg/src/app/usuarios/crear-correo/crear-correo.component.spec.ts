import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCorreoComponent } from './crear-correo.component';

describe('CrearCorreoComponent', () => {
  let component: CrearCorreoComponent;
  let fixture: ComponentFixture<CrearCorreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCorreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
