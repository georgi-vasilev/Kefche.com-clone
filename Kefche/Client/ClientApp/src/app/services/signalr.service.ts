import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ChatMessage } from '../models/chat-message';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public messages: ChatMessage[] = [];
  private connectionUrl = `${apiUrl}signalr`;
  private apiUrl = `${apiUrl}chat`;

  constructor(
    private http: HttpClient) { }

  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  public sendMessageToApi(message: string) {
    return this.http.post(this.apiUrl, this.buildChatMessage(message))
      .pipe(tap(_ => console.log("message successfully sent to api controller")));
  }

  public sendMessageToHub(message: string) {
    var promise = this.hubConnection.invoke("BroadcastAsync", this.buildChatMessage(message))
      .then(() => { console.log('message sent successfully to hub'); })
      .catch((err) => console.log('error while sending a message to hub: ' + err));

    return from(promise);
  }

  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.connectionUrl)
      .withHubProtocol(new MessagePackHubProtocol())
      // .configureLogging(LogLevel.Trace)
      .build();
  }

  private buildChatMessage(message: string): ChatMessage {
    return new ChatMessage(this.hubConnection.connectionId, message);
  }

  private startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalR connection: ' + err))
  }

  private addListeners() {
    this.hubConnection.on("messageReceivedFromApi", (data: ChatMessage) => {
      console.log("message received from API Controller")
      this.messages.push(data);
    })
    this.hubConnection.on("messageReceivedFromHub", (data: ChatMessage) => {
      console.log("message received from Hub")
      this.messages.push(data);
    })
    this.hubConnection.on("newUserConnected", _ => {
      console.log("new user connected")
    })
  }
}