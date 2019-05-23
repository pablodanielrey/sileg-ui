import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjuntarExpedienteComponent } from './adjuntar-expediente.component';

describe('AdjuntarExpedienteComponent', () => {
  let component: AdjuntarExpedienteComponent;
  let fixture: ComponentFixture<AdjuntarExpedienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjuntarExpedienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjuntarExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
