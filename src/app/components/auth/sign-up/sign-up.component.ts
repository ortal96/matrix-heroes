import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { catchError, of, tap, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  errorMassage: string = '';
  submittedInProgress = false;
  signUpForm: FormGroup;
  private readonly passwordRegex = '^(?=.*[A-Z])(?=.*[0-9])(?=.*[$@^!%*?&]).{8,}$';

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    },
      {
        validators: this.passwordsAreEqual
      });
  }

  passwordsAreEqual(control: AbstractControl): { mismatch: boolean } | null {
    const isMatch = control.get('password')?.value === control.get('confirmPassword')?.value;
    if (isMatch) {
      return null;
    }
    return { mismatch: true };
  }

  onSubmit() {
    this.submittedInProgress = true;
    this.authService.signUp(this.signUpForm.value).pipe(
      tap(data => {
        this.signUpForm.reset();
        this.router.navigate(['/login']);
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
