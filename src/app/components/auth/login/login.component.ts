import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, finalize, map, of, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorMassage: string = '';
  submittedInProgress = false;
  loginForm: FormGroup<{
    email: FormControl;
    password: FormControl;
  }>;
  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.submittedInProgress = true;

    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(email, password).pipe(
      tap(() => {
        this.loginForm.reset();
        this.router.navigate(['/heroes']);
      }),
      catchError(error => {
        this.errorMassage = error;
        this.notificationService.error(this.errorMassage);
        return of()
      }),
      finalize(() => {
        this.submittedInProgress = false;
      })
    ).subscribe()
  }


}
