import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionMultipleLugarComponent } from './selecion-multiple-lugar.component';

describe('SelecionMultipleLugarComponent', () => {
  let component: SelecionMultipleLugarComponent;
  let fixture: ComponentFixture<SelecionMultipleLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionMultipleLugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionMultipleLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
