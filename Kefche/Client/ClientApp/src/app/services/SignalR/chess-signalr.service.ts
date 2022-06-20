import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AcceptInvite } from '../../models/acceptInvite';
import { ChessTurnInfo } from '../../models/chess-turn-info';
import { Invite } from '../../models/invite';
import { Session } from '../../models/session';
import { SignalRService } from './signalr.service';

const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class ChessSignalRService extends SignalRService {
  protected connectionUrl = `${apiUrl}signalrchess`;

  private connectionId!: string;
  private sessionId!: string;
  
  private isDisabledSource = new BehaviorSubject<boolean>(false);
  public isDisabled$ = this.isDisabledSource.asObservable();

  private lastMoveSource = new BehaviorSubject<string>('');
  public lastMove$ = this.lastMoveSource.asObservable();

  private moveHistorySource = new BehaviorSubject<any>({});
  public moveHistory$ = this.moveHistorySource.asObservable();

  public static session?: Session;

  constructor(http: HttpClient) {
    super(http)
  }


  public getInviteLink() {
    return this.http.post<Session>(`${apiUrl}invite`, new Invite(this.hubConnection.connectionId));
  }

  public acceptInviteLink(sessionId: string) {
    return this.http.post<Session>(`${apiUrl}accept`, new AcceptInvite(this.hubConnection.connectionId, sessionId));
  }

  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  public addListeners() {
    this.hubConnection.on("turnReceivedFromHub", (data: ChessTurnInfo) => {
      this.isDisabledSource.next(false);
      this.lastMoveSource.next(data.Fen);
      this.moveHistorySource.next(data.MoveList);
    });
  }

  public sendTurnToHub(fen: string, history: Array<any>, player: string) {
    var connectionId = this.hubConnection.connectionId ?? "";
    var sessionId = ChessSignalRService.session?.sessionId ?? "";
    this.isDisabledSource.next(true);
    var promise = this.hubConnection.invoke("SendTurnAsync", new ChessTurnInfo(connectionId, sessionId, fen, history))
      .then(() => {})
      .catch((err) => console.log('error while sending a turn to hub: ' + err));

    return from(promise);
  }
}
