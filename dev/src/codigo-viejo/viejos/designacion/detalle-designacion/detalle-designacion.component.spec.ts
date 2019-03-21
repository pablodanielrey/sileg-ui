import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDesignacionComponent } from './detalle-designacion.component';

describe('DetalleDesignacionComponent', () => {
  let component: DetalleDesignacionComponent;
  let fixture: ComponentFixture<DetalleDesignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleDesignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDesignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
