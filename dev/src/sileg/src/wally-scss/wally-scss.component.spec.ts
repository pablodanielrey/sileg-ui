import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallyScssComponent } from './wally-scss.component';

describe('WallyScssComponent', () => {
  let component: WallyScssComponent;
  let fixture: ComponentFixture<WallyScssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallyScssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallyScssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
