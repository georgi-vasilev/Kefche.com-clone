import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {

  moveHistory: Array<any> = [];
  @ViewChild('board', { static: false }) board: NgxChessBoardView;

  constructor(private boardService: NgxChessBoardService, private notification: NotificationService) {
  }

  ngOnInit() {
  }

  public reset(): void {
    // TODO: request restart
    this.board.reset();
    this.moveHistory = [];
  }

  public undoLastMove(): void {
    // TODO: request undo
    this.board.undo();
    const updatedHistory = this.board.getMoveHistory();
    this.moveHistory = [...updatedHistory];
  }

  public onMoveChange(event: any) {
    console.log(event)
    const checkMate: boolean = event.checkmate;
    const player: string = event.color;
    if(checkMate) {
      this.notification.showSuccess(`${player} wins`, 'Game over');
    }
    const updatedHistory = this.board.getMoveHistory();
    this.moveHistory = [...updatedHistory];
  }

}
