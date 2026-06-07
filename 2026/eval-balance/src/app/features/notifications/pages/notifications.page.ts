import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { HeaderComponent } from '../../../shared/components/header/header';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/user.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgClass, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, MatChipsModule, SidebarComponent, HeaderComponent],
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.css'],
})
export class NotificationsPage implements OnInit, OnDestroy {
  notifications = signal<Notification[]>([]);
  private subs: any[] = [];

  constructor(private notifService: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.subs.push(
      this.notifService.getNotifications().subscribe(n => this.notifications.set(n))
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  markAsRead(id: string): void {
    this.notifService.markAsRead(id);
  }

  markAllAsRead(): void {
    this.notifService.markAllAsRead();
  }

  get groupedNotifications(): { label: string; items: Notification[] }[] {
    const groups: { label: string; items: Notification[] }[] = [];
    const today: Notification[] = [];
    const thisWeek: Notification[] = [];
    const earlier: Notification[] = [];
    const now = new Date();
    for (const n of this.notifications()) {
      const diff = now.getTime() - new Date(n.timestamp).getTime();
      if (diff < 86400000) today.push(n);
      else if (diff < 604800000) thisWeek.push(n);
      else earlier.push(n);
    }
    if (today.length) groups.push({ label: 'Hoy', items: today });
    if (thisWeek.length) groups.push({ label: 'Esta Semana', items: thisWeek });
    if (earlier.length) groups.push({ label: 'Anterior', items: earlier });
    return groups;
  }

  timeAgo(date: Date): string {
    const diff = new Date().getTime() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `hace ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `hace ${hours}h`;
    const days = Math.floor(hours / 24);
    return `hace ${days}d`;
  }

  getIcon(type: string): string {
    switch (type) {
      case 'warning': return 'warning'; case 'success': return 'check_circle'; case 'error': return 'error';
      default: return 'info';
    }
  }

  navigate(link?: string): void {
    if (link) this.router.navigate([link]);
  }
}
