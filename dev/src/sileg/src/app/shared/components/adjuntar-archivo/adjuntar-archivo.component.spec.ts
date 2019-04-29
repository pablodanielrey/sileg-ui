import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjuntarArchivoComponent } from './adjuntar-archivo.component';

describe('AdjuntarArchivoComponent', () => {
  let component: AdjuntarArchivoComponent;
  let fixture: ComponentFixture<AdjuntarArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjuntarArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjuntarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
