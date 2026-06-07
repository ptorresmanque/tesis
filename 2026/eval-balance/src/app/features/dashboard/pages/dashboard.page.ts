import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { HeaderComponent } from '../../../shared/components/header/header';
import { EvaluationService } from '../../../core/services/evaluation.service';
import { LoadMetric, Course } from '../../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, MatProgressBarModule, SidebarComponent, HeaderComponent],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css'],
})
export class DashboardPage implements OnInit, OnDestroy {
  loadMetric = signal<LoadMetric | null>(null);
  courses = signal<Course[]>([]);
  sidebarCollapsed = signal(false);
  private subs: any[] = [];

  constructor(private evalService: EvaluationService) {}

  ngOnInit(): void {
    this.subs.push(
      this.evalService.getLoadMetric().subscribe(m => this.loadMetric.set(m)),
      this.evalService.getCourses().subscribe(c => this.courses.set(c))
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
