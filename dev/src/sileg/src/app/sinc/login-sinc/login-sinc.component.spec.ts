import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSincComponent } from './login-sinc.component';

describe('LoginSincComponent', () => {
  let component: LoginSincComponent;
  let fixture: ComponentFixture<LoginSincComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSincComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
