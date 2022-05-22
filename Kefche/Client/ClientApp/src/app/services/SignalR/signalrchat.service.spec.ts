/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SignalRChatService } from './signalrchat.service';

describe('Service: Signalr Chat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalRChatService]
    });
  });

  it('should ...', inject([SignalRChatService], (service: SignalRChatService) => {
    expect(service).toBeTruthy();
  }));
});
