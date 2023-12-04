import { TestBed } from '@angular/core/testing';

import { InvesmentService } from './invesment.service';

describe('InvesmentService', () => {
  let service: InvesmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvesmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
