import { TestBed } from '@angular/core/testing';

import { VolverService } from './volver.service';

describe('VolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolverService = TestBed.get(VolverService);
    expect(service).toBeTruthy();
  });
});
