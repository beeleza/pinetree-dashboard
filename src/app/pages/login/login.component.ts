import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginRequest } from '../../core/models/LoginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value as LoginRequest;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const message =
          err.error?.message || 'Erro ao fazer login. Tente novamente.';
        // this.snackBar.open(message, 'Fechar', {
        //   duration: 5000,
        //   horizontalPosition: 'right',
        //   verticalPosition: 'top',
        //   panelClass: ['snack-error'], // opcional para estilizar
        // });
      }
    });
  }
}
