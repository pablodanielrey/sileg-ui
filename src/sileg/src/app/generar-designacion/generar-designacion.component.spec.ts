import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarDesignacionComponent } from './generar-designacion.component';

describe('GenerarDesignacionComponent', () => {
  let component: GenerarDesignacionComponent;
  let fixture: ComponentFixture<GenerarDesignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarDesignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarDesignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
