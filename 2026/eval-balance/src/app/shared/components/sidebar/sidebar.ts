import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatListModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class SidebarComponent {
  collapsed = false;
  userRole: string | null = null;

  menuItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard', roles: ['student', 'teacher', 'admin'] },
    { path: '/dashboard/assigner', icon: 'assignment_add', label: 'Asignador', roles: ['teacher', 'admin'] },
    { path: '/dashboard/my-evaluations', icon: 'fact_check', label: 'Mis Evaluaciones', roles: ['student', 'teacher'] },
    { path: '/dashboard/reports', icon: 'analytics', label: 'Reportes', roles: ['admin', 'teacher'] },
    { path: '/dashboard/profile', icon: 'person', label: 'Perfil', roles: ['student', 'teacher', 'admin'] },
    { path: '/dashboard/calendar', icon: 'calendar_month', label: 'Calendario', roles: ['student', 'teacher', 'admin'] },
    { path: '/dashboard/notifications', icon: 'notifications', label: 'Notificaciones', roles: ['student', 'teacher', 'admin'] },
    { path: '/dashboard/history', icon: 'history', label: 'Historial', roles: ['student', 'teacher', 'admin'] },
    { path: '/dashboard/settings', icon: 'settings', label: 'Configuración', roles: ['teacher', 'admin'] },
  ];

  constructor(private authService: AuthService) {
    this.userRole = this.authService.getCurrentUser()?.role ?? null;
  }

  get visibleItems() {
    return this.menuItems.filter(item => item.roles.includes(this.userRole || ''));
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }
}
