import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../services/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  text: string = "";

  constructor(public signalR: SignalRService) { }

  ngOnInit(): void {
    this.signalR.connect();
  }

  sendMessage(): void {
    this.signalR.sendMessageToHub(this.text).subscribe({
      next: _ => this.text = '',
      error: (err) => console.error(err)
    });
  }
}
