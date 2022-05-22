import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NgModule } from '@angular/core';
import { BoardComponent } from '../tic-tac-toe/board/board.component';
import { SquareComponent } from '../tic-tac-toe/square/square.component';

@NgModule({
  declarations: [
    NavigationComponent,
    BoardComponent,
    SquareComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BoardComponent,
    SquareComponent,
  ]
})
export class CoreModule { }
