import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEliminarLugarComponent } from './dialogo-eliminar-lugar.component';

describe('DialogoEliminarLugarComponent', () => {
  let component: DialogoEliminarLugarComponent;
  let fixture: ComponentFixture<DialogoEliminarLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEliminarLugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEliminarLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
