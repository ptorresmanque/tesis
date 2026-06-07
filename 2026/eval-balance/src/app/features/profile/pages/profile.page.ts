import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { HeaderComponent } from '../../../shared/components/header/header';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatTabsModule, MatDividerModule, SidebarComponent, HeaderComponent],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage {
  name = signal('');
  email = signal('');
  department = signal('');
  bio = signal('');
  language = signal('es');
  timezone = signal('America/Santiago');
  notifEmail = signal(true);
  notifPush = signal(true);
  notifDigest = signal(false);
  notifReminders = signal(true);

  constructor(public authService: AuthService) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.name.set(user.name);
      this.email.set(user.email);
      this.department.set(user.department || '');
    }
  }

  saveChanges(): void {
    alert('Cambios guardados exitosamente.');
  }
}
