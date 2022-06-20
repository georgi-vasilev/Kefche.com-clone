/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChessSignalrService } from './chess-signalr.service';

describe('Service: ChessSignalr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChessSignalrService]
    });
  });

  it('should ...', inject([ChessSignalrService], (service: ChessSignalrService) => {
    expect(service).toBeTruthy();
  }));
});
