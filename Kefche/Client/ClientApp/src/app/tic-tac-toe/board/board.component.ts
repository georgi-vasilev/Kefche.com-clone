import { SignalRTTTService } from 'src/app/services/SignalR/signalrtictactoe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  constructor(public signalR: SignalRTTTService) {}

  ngOnInit() {
    this.signalR.connect();
    this.signalR.newGame();
  }
}
