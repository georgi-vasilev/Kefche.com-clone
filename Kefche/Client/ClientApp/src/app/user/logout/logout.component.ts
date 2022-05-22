import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { 
      this.logout();
    }

  ngOnInit(): void {
  }

  logout(): void {
      this.authService.clearToken();
      this.router.navigate(['/']);
  }
}
