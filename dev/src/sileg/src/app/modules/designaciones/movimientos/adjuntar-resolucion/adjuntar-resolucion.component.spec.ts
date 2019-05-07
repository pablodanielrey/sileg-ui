import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjuntarResolucionComponent } from './adjuntar-resolucion.component';

describe('AdjuntarResolucionComponent', () => {
  let component: AdjuntarResolucionComponent;
  let fixture: ComponentFixture<AdjuntarResolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjuntarResolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjuntarResolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
