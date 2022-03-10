import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.authService.saveToken(data['token']);
      this.router.navigate(['/']);
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
