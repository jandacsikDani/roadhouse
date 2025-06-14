import { TestBed } from '@angular/core/testing';

import { EditTypeService } from './edit-type.service';

describe('EditTypeService', () => {
  let service: EditTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
