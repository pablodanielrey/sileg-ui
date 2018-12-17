import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SincLoginComponent } from './sinc-login.component';

describe('SincLoginComponent', () => {
  let component: SincLoginComponent;
  let fixture: ComponentFixture<SincLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SincLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SincLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
