import * as signalR from '@microsoft/signalr';
import { ChatMessage } from '../models/chat-message';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public messages: ChatMessage[] = [];
  private connectionUrl = 'https://localhost:5000/signalr';
  private apiUrl = 'https://localhost:5000/chat';

  constructor(private http: HttpClient) { }

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
    // const options = {
    //   accessTokenFactory: () => {
    //     return localStorage.getItem('token');
    //   }
    // };

    return new HubConnectionBuilder()
      // .withUrl(this.connectionUrl, options)
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(this.connectionUrl)
      .withHubProtocol(new MessagePackHubProtocol())
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