import { SignalRService } from './signalr.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Invite } from 'src/app/models/invite';
import { TurnInfo } from 'src/app/models/turn-info';
import { Session } from 'src/app/models/session';
import { AcceptInvite } from 'src/app/models/acceptInvite';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SignalRTTTService extends SignalRService {
  protected connectionUrl = `${apiUrl}signalrttt`;
  public static session?: Session;
  public squares!: string[];
  public xIsNext!: boolean;
  public winner!: string | null;
  public peerId!: string;
  connectionId!: string;
  sessionId!: string;
  private isDisabled = false;

  constructor(http: HttpClient) {
    super(http)
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }
  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  public getInviteLink() {
    return this.http.post<Session>(`${apiUrl}invite`, new Invite(this.hubConnection.connectionId));
  }

  public acceptInviteLink(sessionId: string) {
    return this.http.post<Session>(`${apiUrl}accept`, new AcceptInvite(this.hubConnection.connectionId, sessionId));
  }

  public makeMove(idx: number) {
    if(this.isDisabled){
      return;
    }
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;

      this.sendTurnToHub(idx);
    }

    this.winner = this.calculateWinner();
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  public sendTurnToHub(cell: number) {
    var connectionId = this.hubConnection.connectionId ?? "";
    var sessionId = SignalRTTTService?.session?.sessionId ?? "";
    this.isDisabled = true;
    var promise = this.hubConnection.invoke("SendTurnAsync", new TurnInfo(connectionId, sessionId, cell))
      .then(() => { console.log(`turn ${cell} sent successfully to hub`); })
      .catch((err) => console.log('error while sending a turn to hub: ' + err));

    return from(promise);
  }

  private addListeners() {
    this.hubConnection.on("turnReceivedFromHub", (data: TurnInfo) => {
      this.fillPreviousPlayerChoice(data.Cell);
      this.isDisabled = false;
      console.log("turn received from API Controller" + data.Cell)
    });
  }

  public fillPreviousPlayerChoice(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }
}