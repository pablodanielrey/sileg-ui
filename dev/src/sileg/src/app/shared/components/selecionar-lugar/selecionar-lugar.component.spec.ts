import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarLugarComponent } from './selecionar-lugar.component';

describe('SelecionarLugarComponent', () => {
  let component: SelecionarLugarComponent;
  let fixture: ComponentFixture<SelecionarLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionarLugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
