import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarPrestacionComponent } from './verificar-prestacion.component';

describe('VerificarPrestacionComponent', () => {
  let component: VerificarPrestacionComponent;
  let fixture: ComponentFixture<VerificarPrestacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarPrestacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarPrestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
