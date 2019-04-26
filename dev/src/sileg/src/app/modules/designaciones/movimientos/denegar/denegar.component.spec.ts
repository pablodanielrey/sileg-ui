import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenegarComponent } from './denegar.component';

describe('DenegarComponent', () => {
  let component: DenegarComponent;
  let fixture: ComponentFixture<DenegarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenegarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenegarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
