import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemploErrorComponent } from './ejemplo-error.component';

describe('EjemploErrorComponent', () => {
  let component: EjemploErrorComponent;
  let fixture: ComponentFixture<EjemploErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjemploErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjemploErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
