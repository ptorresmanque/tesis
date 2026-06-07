import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/login/pages/login.page').then(m => m.LoginPage) },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/pages/dashboard.page').then(m => m.DashboardPage), canActivate: [AuthGuard] },
  { path: 'dashboard/assigner', loadComponent: () => import('./features/assigner/pages/assigner.page').then(m => m.AssignerPage), canActivate: [AuthGuard] },
  { path: 'dashboard/my-evaluations', loadComponent: () => import('./features/evaluations/pages/evaluations.page').then(m => m.EvaluationsPage), canActivate: [AuthGuard] },
  { path: 'dashboard/reports', loadComponent: () => import('./features/reports/pages/reports.page').then(m => m.ReportsPage), canActivate: [AuthGuard] },
  { path: 'dashboard/profile', loadComponent: () => import('./features/profile/pages/profile.page').then(m => m.ProfilePage), canActivate: [AuthGuard] },
  { path: 'dashboard/calendar', loadComponent: () => import('./features/calendar/pages/calendar.page').then(m => m.CalendarPage), canActivate: [AuthGuard] },
  { path: 'dashboard/notifications', loadComponent: () => import('./features/notifications/pages/notifications.page').then(m => m.NotificationsPage), canActivate: [AuthGuard] },
  { path: 'dashboard/history', loadComponent: () => import('./features/history/pages/history.page').then(m => m.HistoryPage), canActivate: [AuthGuard] },
  { path: 'dashboard/settings', loadComponent: () => import('./features/settings/pages/settings.page').then(m => m.SettingsPage), canActivate: [AuthGuard] },
  { path: 'help', loadComponent: () => import('./features/help/pages/help.page').then(m => m.HelpPage) },
];
