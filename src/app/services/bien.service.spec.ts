import { TestBed } from '@angular/core/testing';

import { BiensService } from './bien.service';

describe('BienService', () => {
  let service: BiensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
