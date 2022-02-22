import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './user/register/register.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
