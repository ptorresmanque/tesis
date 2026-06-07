import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { HeaderComponent } from '../../../shared/components/header/header';

@Component({
  selector: 'app-assigner',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSliderModule, MatDatepickerModule, MatButtonModule, MatIconModule, MatChipsModule, MatDialogModule, MatTableModule, MatDividerModule, SidebarComponent, HeaderComponent],
  templateUrl: './assigner.page.html',
  styleUrls: ['./assigner.page.css'],
})
export class AssignerPage {
  title = signal('');
  course = signal('');
  complexity = signal(3);
  minReviews = signal(2);
  maxReviews = signal(5);
  expertiseWeight = signal(5);
  loadWeight = signal(5);
  balanced = signal(false);

  displayedColumns = ['student', 'evaluations', 'load', 'expertise', 'actions'];
  assignmentData = [
    { student: 'Ana García', evaluations: 3, load: 2.1, expertise: 4 },
    { student: 'Carlos López', evaluations: 4, load: 3.5, expertise: 3 },
    { student: 'María Torres', evaluations: 2, load: 1.8, expertise: 5 },
    { student: 'Pedro Martínez', evaluations: 5, load: 4.2, expertise: 2 },
    { student: 'Laura Sánchez', evaluations: 3, load: 2.5, expertise: 4 },
  ];

  showExplanation = signal(false);
  explanationData = {
    SHAP: [
      { feature: 'Carga actual', value: 2.1, impact: 0.32 },
      { feature: 'Expertise previa', value: 4, impact: 0.45 },
      { feature: 'Disponibilidad', value: 0.8, impact: 0.23 },
    ]
  };

  get balanceBefore() { return { good: 35, overloaded: 40, underloaded: 25 }; }
  get balanceAfter() { return { good: 78, overloaded: 12, underloaded: 10 }; }

  onBalance(): void {
    this.balanced.set(true);
  }

  onExplain(): void {
    this.showExplanation.set(!this.showExplanation());
  }
}
