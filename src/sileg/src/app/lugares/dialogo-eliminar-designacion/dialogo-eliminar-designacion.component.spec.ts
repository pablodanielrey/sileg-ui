import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEliminarDesignacionComponent } from './dialogo-eliminar-designacion.component';

describe('DialogoEliminarDesignacionComponent', () => {
  let component: DialogoEliminarDesignacionComponent;
  let fixture: ComponentFixture<DialogoEliminarDesignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEliminarDesignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEliminarDesignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
