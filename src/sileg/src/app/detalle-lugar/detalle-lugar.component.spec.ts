import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLugarComponent } from './detalle-lugar.component';

describe('DetalleLugarComponent', () => {
  let component: DetalleLugarComponent;
  let fixture: ComponentFixture<DetalleLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleLugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
