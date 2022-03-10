import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private route: Router) {
    this.registerForm = this.fb.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  register(): void {
    this.authService.register(this.registerForm.value).subscribe(() => {
      this.notificationService.showSuccess('Successful registration!', 'Registration completed');
      this.route.navigate(['/login']);
    })
  }

  get username(): AbstractControl | null {
    return this.registerForm.get('username')
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email')
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password')
  }

}