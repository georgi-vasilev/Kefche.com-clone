import { SignalRService } from './signalr.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ChatMessage } from '../../models/chat-message';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SignalRChatService extends SignalRService{
  public messages: ChatMessage[] = [];
  static apiUrl : string = `${apiUrl}chat`;
  protected connectionUrl = `${apiUrl}signalrchat`;
  constructor(http: HttpClient) { 
      super(http)
    }

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

  private buildChatMessage(message: string): ChatMessage {
    return new ChatMessage(this.hubConnection.connectionId, message);
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
      console.log("new user connected " + this.hubConnection.connectionId)
    })
  }
}