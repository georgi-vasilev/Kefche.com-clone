import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ChatMessage } from '../../models/chat-message';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export abstract class SignalRService {
  protected hubConnection!: signalR.HubConnection;
  protected abstract connectionUrl: string;
  protected inviteUrl = `${apiUrl}invite`;
  protected apiUrl!: string;

  constructor(
    protected http: HttpClient) { }

  public connect = () => {
    this.startConnection();
  }

  protected getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.connectionUrl)
      .withHubProtocol(new MessagePackHubProtocol())
      // .configureLogging(LogLevel.Trace)
      .build();
  }

  protected startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalR connection: ' + err))
  }

  public generateInvite(){
    var result = this.http.post(this.inviteUrl, {connectionId: this.hubConnection.connectionId});
    console.log("generate invite sent to controller" + result);
  }
}