import { TestBed } from '@angular/core/testing';

import { NewCategService } from './new-categ.service';

describe('NewCategService', () => {
  let service: NewCategService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCategService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
