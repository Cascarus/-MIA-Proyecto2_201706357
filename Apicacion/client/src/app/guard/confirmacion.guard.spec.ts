import { TestBed } from '@angular/core/testing';

import { ConfirmacionGuard } from './confirmacion.guard';

describe('ConfirmacionGuard', () => {
  let guard: ConfirmacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
