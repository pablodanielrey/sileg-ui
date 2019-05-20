import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarUnlpComponent } from './enviar-unlp.component';

describe('EnviarUnlpComponent', () => {
  let component: EnviarUnlpComponent;
  let fixture: ComponentFixture<EnviarUnlpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarUnlpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarUnlpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
