import { TestBed } from '@angular/core/testing';

import { LoadDataResolverService } from './load-data-resolver.service';

describe('LoadDataResolverService', () => {
  let service: LoadDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
