import { Injectable, signal } from '@angular/core';
import { Notification } from '../models/user.model';
import { Observable, of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = signal<Notification[]>(this.getMockNotifications());
  private unreadCount = signal(3);

  readonly notificationsSignal = this.notifications.asReadonly();
  readonly unreadCountSignal = this.unreadCount.asReadonly();

  getNotifications(): Observable<Notification[]> {
    return of(this.notifications()).pipe(delay(200));
  }

  markAsRead(id: string): void {
    this.notifications.update(items =>
      items.map(n => n.id === id ? { ...n, read: true } : n)
    );
    this.updateUnreadCount();
  }

  markAllAsRead(): void {
    this.notifications.update(items => items.map(n => ({ ...n, read: true })));
    this.unreadCount.set(0);
  }

  private updateUnreadCount(): void {
    const count = this.notifications().filter(n => !n.read).length;
    this.unreadCount.set(count);
  }

  private getMockNotifications(): Notification[] {
    const now = new Date();
    return [
      { id: 'n1', type: 'warning', title: 'Evaluaciones por vencer', message: '12 evaluaciones deben ser calificadas antes de las 23:59', timestamp: new Date(now.getTime() - 1800000), read: false, link: '/dashboard/evaluations' },
      { id: 'n2', type: 'success', title: 'Balanceo completado', message: 'Asignación automática para INF-324 completada con 89% de equilibrio', timestamp: new Date(now.getTime() - 7200000), read: false, link: '/dashboard/assigner' },
      { id: 'n3', type: 'info', title: 'Nuevo curso asignado', message: 'Se le ha asignado al curso "Redes de Computadores"', timestamp: new Date(now.getTime() - 86400000), read: false, link: '/dashboard/courses' },
      { id: 'n4', type: 'error', title: 'Desequilibrio detectado', message: 'El curso INF-431 supera el umbral crítico de carga', timestamp: new Date(now.getTime() - 172800000), read: true, link: '/dashboard/reports' },
      { id: 'n5', type: 'info', title: 'Recordatorio', message: 'Reunión de revisión de pares en 2 horas', timestamp: new Date(now.getTime() - 259200000), read: true },
    ];
  }
}
