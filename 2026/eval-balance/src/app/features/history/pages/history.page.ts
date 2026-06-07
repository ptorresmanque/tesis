import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { HeaderComponent } from '../../../shared/components/header/header';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatTableModule, MatPaginatorModule, MatExpansionModule, SidebarComponent, HeaderComponent],
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.css'],
})
export class HistoryPage {
  searchQuery = signal('');
  filterStatus = signal('all');
  sortOrder = signal('newest');
  panelOpenState = signal(false);

  evaluations = [
    { id: 'e1', title: 'Análisis de Requisitos', course: 'Ing. Software', dueDate: '15/03/2026', status: 'completed', grade: 85, maxGrade: 100, rubricScore: 4.2, reviewerComments: 'Buen análisis, faltó profundizar en requisitos no funcionales', timeSpent: '45 min' },
    { id: 'e2', title: 'Diseño de Base de Datos', course: 'Bases de Datos', dueDate: '20/03/2026', status: 'graded', grade: 92, maxGrade: 100, rubricScore: 4.6, reviewerComments: 'Excelente diseño normalizado', timeSpent: '1h 20min' },
    { id: 'e3', title: 'Arquitectura MVC', course: 'Ing. Software', dueDate: '10/03/2026', status: 'past_due', grade: 0, maxGrade: 50, rubricScore: 0, reviewerComments: '', timeSpent: '-' },
    { id: 'e4', title: 'Normalización BD', course: 'Bases de Datos', dueDate: '25/03/2026', status: 'completed', grade: 78, maxGrade: 80, rubricScore: 3.9, reviewerComments: 'Bien, algunos errores en 3FN', timeSpent: '55 min' },
    { id: 'e5', title: 'Protocolos TCP/IP', course: 'Redes', dueDate: '05/04/2026', status: 'graded', grade: 88, maxGrade: 100, rubricScore: 4.4, reviewerComments: 'Muy completo', timeSpent: '1h 10min' },
  ];

  statusColors: Record<string, string> = { completed: '#2e7d32', graded: '#1565c0', past_due: '#c62828' };

  get filteredEvals() {
    let items = [...this.evaluations];
    if (this.filterStatus() !== 'all') items = items.filter(e => e.status === this.filterStatus());
    if (this.searchQuery()) {
      const q = this.searchQuery().toLowerCase();
      items = items.filter(e => e.title.toLowerCase().includes(q) || e.course.toLowerCase().includes(q));
    }
    if (this.sortOrder() === 'newest') items.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
    else items.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    return items;
  }
}
