/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SignalRService } from './signalr.service';

describe('Service: Signalr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalRService]
    });
  });

  it('should ...', inject([SignalRService], (service: SignalRService) => {
    expect(service).toBeTruthy();
  }));
});
