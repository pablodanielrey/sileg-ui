import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SincUsuariosComponent } from './sinc-usuarios.component';

describe('SincUsuariosComponent', () => {
  let component: SincUsuariosComponent;
  let fixture: ComponentFixture<SincUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SincUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SincUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
