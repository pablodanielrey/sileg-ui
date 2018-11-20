import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignacionesPorLugarComponent } from './designaciones-por-lugar.component';

describe('DesignacionesPorLugarComponent', () => {
  let component: DesignacionesPorLugarComponent;
  let fixture: ComponentFixture<DesignacionesPorLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignacionesPorLugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignacionesPorLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
