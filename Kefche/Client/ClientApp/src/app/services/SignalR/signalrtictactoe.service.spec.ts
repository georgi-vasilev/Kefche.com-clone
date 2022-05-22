/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SignalRTTTService } from './signalrtictactoe.service';

describe('Service: Signalr Tic Tac Toe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalRTTTService]
    });
  });

  it('should ...', inject([SignalRTTTService], (service: SignalRTTTService) => {
    expect(service).toBeTruthy();
  }));
});
