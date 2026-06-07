import { Injectable, signal } from '@angular/core';
import { User, AuthState } from '../models/user.model';
import { Observable, of, delay, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private state = signal<AuthState>({ user: null, token: null, isAuthenticated: false });

  readonly authState = this.state.asReadonly();

  login(email: string, password: string): Observable<User> {
    const mockUser: User = {
      id: '1',
      name: 'Dr. Patricio Muñoz',
      email: email,
      role: email.includes('admin') ? 'admin' : email.includes('teacher') ? 'teacher' : 'student',
      department: 'Ingeniería Informática',
      loadFactor: 2.8,
      avatar: ''
    };
    return of(mockUser).pipe(
      delay(800),
      tap(user => {
        this.state.set({ user, token: 'mock-jwt-token', isAuthenticated: true });
      })
    );
  }

  logout(): void {
    this.state.set({ user: null, token: null, isAuthenticated: false });
  }

  getCurrentUser(): User | null {
    return this.state().user;
  }
}
