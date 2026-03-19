import { TestBed } from '@angular/core/testing';

import { ConfirmStateServiceService } from './confirm-state-service.service';

describe('ConfirmStateServiceService', () => {
  let service: ConfirmStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
