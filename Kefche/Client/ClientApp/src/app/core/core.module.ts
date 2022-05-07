import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NgModule } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { SquareComponent } from '../square/square.component';

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
