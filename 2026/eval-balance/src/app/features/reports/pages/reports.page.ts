import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { HeaderComponent } from '../../../shared/components/header/header';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatTableModule, MatChipsModule, MatDividerModule, SidebarComponent, HeaderComponent],
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.css'],
})
export class ReportsPage {
  reportType = signal('load');
  displayedColumns = ['course', 'students', 'avgLoad', 'balance', 'trend'];
  courseData = [
    { course: 'INF-324 Ing. Software', students: 45, avgLoad: 3.2, balance: 72, trend: 'up' },
    { course: 'INF-215 Bases de Datos', students: 52, avgLoad: 2.8, balance: 85, trend: 'up' },
    { course: 'INF-431 Redes', students: 38, avgLoad: 4.1, balance: 45, trend: 'down' },
    { course: 'INF-542 IA', students: 30, avgLoad: 2.1, balance: 92, trend: 'up' },
    { course: 'INF-101 Programación', students: 60, avgLoad: 3.5, balance: 63, trend: 'down' },
  ];
  metrics = [
    { label: 'Total Evaluaciones', value: '1,247', change: '+12%', icon: 'assignment' },
    { label: 'Estudiantes Activos', value: '845', change: '+5%', icon: 'group' },
    { label: 'Tiempo Respuesta Prom.', value: '1.8s', change: '-15%', icon: 'speed' },
    { label: 'Score de Balanceo', value: '89%', change: '+8%', icon: 'balance' },
  ];
}
