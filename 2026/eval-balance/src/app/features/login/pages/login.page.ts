import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage {
  email = signal('');
  password = signal('');
  loading = signal(false);
  error = signal('');
  hidePassword = signal(true);

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.email() || !this.password()) {
      this.error.set('Ingrese email y contraseña');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.authService.login(this.email(), this.password()).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Error de autenticación');
      }
    });
  }

  // Quick login helpers for demo
  loginAsAdmin(): void {
    this.email.set('admin@evalbalance.cl');
    this.password.set('admin123');
    this.onLogin();
  }
  loginAsTeacher(): void {
    this.email.set('teacher@evalbalance.cl');
    this.password.set('teacher123');
    this.onLogin();
  }
  loginAsStudent(): void {
    this.email.set('student@evalbalance.cl');
    this.password.set('student123');
    this.onLogin();
  }
}
