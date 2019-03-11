import { TestBed, inject } from '@angular/core/testing';

import { SilegService } from './sileg.service';

describe('SilegService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SilegService]
    });
  });

  it('should be created', inject([SilegService], (service: SilegService) => {
    expect(service).toBeTruthy();
  }));
});
