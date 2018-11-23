import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignacionesPorPersonaComponent } from './designaciones-por-persona.component';

describe('DesignacionesPorPersonaComponent', () => {
  let component: DesignacionesPorPersonaComponent;
  let fixture: ComponentFixture<DesignacionesPorPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignacionesPorPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignacionesPorPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
