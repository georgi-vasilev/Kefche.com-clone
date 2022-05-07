import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './user/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './user/logout/logout.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
