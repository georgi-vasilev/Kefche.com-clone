import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';
import { Subscription } from 'rxjs';
import { Session } from '../models/session';
import { NotificationService } from '../services/notification.service';
import { ChessSignalRService } from '../services/SignalR/chess-signalr.service';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {
  // public isDisabled: boolean = false;

  moveHistory: Array<any> = [];
  @ViewChild('board', { static: false }) board: NgxChessBoardView;

  constructor(
    private boardService: NgxChessBoardService,
    private notification: NotificationService,
    private chessSignalR: ChessSignalRService) {
  }

  ngOnInit() {
    this.chessSignalR.connect();
    // this.chessSignalR.isDisabled$
    //   .subscribe((data: boolean) => {
    //     this.isDisabled = data;
    //   });

    this.chessSignalR.lastMove$
      .subscribe((data: string) => {
        if (this.board) {
          this.board.setFEN(data);
        }
      })

    this.chessSignalR.moveHistory$
      .subscribe((data: Array<any>) => {
        if (data.length > 0) {
          this.moveHistory = [...data];
        }
      })
  }

  getInviteLink(inputElement: any) {
    this.chessSignalR.getInviteLink()
      .subscribe((data: Session) => {
        inputElement.value = data.sessionId;
        ChessSignalRService.session = data;
      });
  }

  copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  acceptInvite(inputElement: any) {
    var guid = inputElement.value;
    this.chessSignalR.acceptInviteLink(guid)
      .subscribe((data: Session) => {
        ChessSignalRService.session = data;
      });
  }

  public reset(): void {
    this.board.reset();
    this.moveHistory = [];
  }

  public undoLastMove(): void {
    this.board.undo();
    const updatedHistory = this.board.getMoveHistory();
    this.moveHistory = [...updatedHistory];
  }

  public onMoveChange(event: any) {
    // if(this.isDisabled){
    //   return;
    // }
    const checkMate: boolean = event.checkmate;
    const player: string = event.color;
    const fen: string = event.fen;
    const history = this.board.getMoveHistory();
    this.chessSignalR.sendTurnToHub(fen, history, player);

    if (checkMate) {
      this.notification.showSuccess(`${player} wins`, 'Game over');
    }
    const updatedHistory = this.board.getMoveHistory();
    this.moveHistory = [...updatedHistory];
  }

}
