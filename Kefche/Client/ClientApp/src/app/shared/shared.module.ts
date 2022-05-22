import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ChatComponent } from './chat/chat.component';
import { BoardComponent } from '../tic-tac-toe/board/board.component';


@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ChatComponent,
  ]
})
export class SharedModule { }
