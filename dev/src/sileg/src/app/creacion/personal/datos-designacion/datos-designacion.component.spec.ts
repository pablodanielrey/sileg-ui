import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDesignacionComponent } from './datos-designacion.component';

describe('DatosDesignacionComponent', () => {
  let component: DatosDesignacionComponent;
  let fixture: ComponentFixture<DatosDesignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosDesignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDesignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
