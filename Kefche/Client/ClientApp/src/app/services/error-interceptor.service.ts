import { AuthService } from './auth.service';
import { catchError, retry } from 'rxjs/operators';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private notificationService: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error) => {
        if (error.status === 401) {
          const message = 'Please login!';
          const title = 'Unauthorized';
          this.notificationService.showError(message, title);
        } else if (error.status === 404) {
          const message = 'Page not found!';
          const title = 'Not found';
          this.notificationService.showError(message, title);

        } else if (error.status === 400) {
          const message = 'Sorry, bad request!';
          const title = 'Bad Request';
          this.notificationService.showError(message, title);

        } else {
          // global message
          const message = error.message;
          const title = error.title;
          this.notificationService.showError(message, title);
        }

        return throwError(error);
      })
    )
  }
}
