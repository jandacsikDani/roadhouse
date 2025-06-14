import { TestBed } from '@angular/core/testing';

import { NewFoodService } from './new-food.service';

describe('NewFoodService', () => {
  let service: NewFoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewFoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
