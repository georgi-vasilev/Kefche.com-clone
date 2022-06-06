import { Invite } from 'src/app/models/invite';
import { Component, OnInit } from '@angular/core';
import { SignalRTTTService } from 'src/app/services/SignalR/signalrtictactoe.service';
import { Session } from 'src/app/models/session';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  constructor(public signalR: SignalRTTTService) { }

  ngOnInit(): void {
    this.signalR.connect();
  }

  getInviteLink(inputElement: any) {
    this.signalR.getInviteLink()
    .subscribe((data: Session) => 
    {
      inputElement.value = data.sessionId;
      SignalRTTTService.session = data;
    });
  }

  copyInputMessage(inputElement: any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  acceptInvite(inputElement: any){
    var guid = inputElement.value;
    this.signalR.acceptInviteLink(guid)
    .subscribe((data: Session) => 
    {
      console.log('Invite accepted ')
      console.log(data)
      SignalRTTTService.session = data;
    });
  }
}
