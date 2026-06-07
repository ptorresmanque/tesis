import { Component, input, output, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, MatDividerModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  title = input<string>('');
  menuToggled = output<void>();
  unreadCount = computed(() => this.notifService.unreadCountSignal());

  constructor(
    private authService: AuthService,
    private notifService: NotificationService,
    private router: Router
  ) {}

  get user() {
    return this.authService.getCurrentUser();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onNotifications(): void {
    this.router.navigate(['/dashboard/notifications']);
  }

  goToProfile(): void { this.router.navigate(['/dashboard/profile']); }
  goToSettings(): void { this.router.navigate(['/dashboard/settings']); }
}
