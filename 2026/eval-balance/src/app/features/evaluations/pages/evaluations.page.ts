import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { HeaderComponent } from '../../../shared/components/header/header';
import { EvaluationService } from '../../../core/services/evaluation.service';
import { Evaluation } from '../../../core/models/user.model';

@Component({
  selector: 'app-evaluations',
  standalone: true,
  imports: [NgClass, FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, SidebarComponent, HeaderComponent],
  templateUrl: './evaluations.page.html',
  styleUrls: ['./evaluations.page.css'],
})
export class EvaluationsPage implements OnInit, OnDestroy {
  evaluations = signal<Evaluation[]>([]);
  showExtensionModal = signal(false);
  extensionReason = signal('');
  currentLoad = 2.8;
  maxLoad = 5.0;
  private subs: any[] = [];

  constructor(private evalService: EvaluationService) {}

  ngOnInit(): void {
    this.subs.push(
      this.evalService.getEvaluations().subscribe(e => this.evaluations.set(e))
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  get pending() { return this.evaluations().filter(e => e.status === 'pending'); }
  get inProgress() { return this.evaluations().filter(e => e.status === 'in_progress'); }
  get completed() { return this.evaluations().filter(e => e.status === 'completed' || e.status === 'graded'); }

  openExtensionModal(): void {
    this.showExtensionModal.set(true);
  }

  closeExtensionModal(): void {
    this.showExtensionModal.set(false);
    this.extensionReason.set('');
  }

  submitExtension(): void {
    alert('Solicitud de extensión enviada al profesor.');
    this.closeExtensionModal();
  }

  isOverdue(evalItem: Evaluation): boolean {
    return new Date(evalItem.dueDate) < new Date() && evalItem.status === 'pending';
  }

  daysUntil(date: Date): number {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / 86400000));
  }
}
