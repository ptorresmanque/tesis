import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { HeaderComponent } from '../../../shared/components/header/header';
import { EvaluationService } from '../../../core/services/evaluation.service';
import { CalendarEvent } from '../../../core/models/user.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DatePipe, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, SidebarComponent, HeaderComponent],
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.css'],
})
export class CalendarPage implements OnInit, OnDestroy {
  events = signal<CalendarEvent[]>([]);
  currentMonth = signal(new Date().getMonth());
  currentYear = signal(new Date().getFullYear());
  selectedDay = signal<number | null>(null);
  filter = signal<'all' | 'pending' | 'completed' | 'urgent'>('all');
  private subs: any[] = [];

  constructor(private evalService: EvaluationService) {}

  ngOnInit(): void {
    this.subs.push(
      this.evalService.getCalendarEvents().subscribe(e => this.events.set(e))
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  goToToday(): void {
    const now = new Date();
    this.currentMonth.set(now.getMonth());
    this.currentYear.set(now.getFullYear());
    this.selectedDay.set(null);
  }

  setFilter(f: string): void {
    this.filter.set(f as 'all' | 'pending' | 'completed' | 'urgent');
  }

  get monthName(): string {
    return ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][this.currentMonth()];
  }

  get daysInMonth(): number {
    return new Date(this.currentYear(), this.currentMonth() + 1, 0).getDate();
  }

  get firstDayOfMonth(): number {
    return new Date(this.currentYear(), this.currentMonth(), 1).getDay();
  }

  get calendarDays(): (number | null)[] {
    const days: (number | null)[] = [];
    for (let i = 0; i < this.firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= this.daysInMonth; i++) days.push(i);
    return days;
  }

  prevMonth(): void {
    if (this.currentMonth() === 0) { this.currentMonth.set(11); this.currentYear.update(y => y - 1); }
    else { this.currentMonth.update(m => m - 1); }
    this.selectedDay.set(null);
  }

  nextMonth(): void {
    if (this.currentMonth() === 11) { this.currentMonth.set(0); this.currentYear.update(y => y + 1); }
    else { this.currentMonth.update(m => m + 1); }
    this.selectedDay.set(null);
  }

  isToday(day: number): boolean {
    const d = new Date();
    return d.getDate() === day && d.getMonth() === this.currentMonth() && d.getFullYear() === this.currentYear();
  }

  getEventsForDay(day: number): CalendarEvent[] {
    const date = new Date(this.currentYear(), this.currentMonth(), day);
    return this.events().filter(e => {
      const ed = new Date(e.date);
      return ed.getDate() === day && ed.getMonth() === this.currentMonth() && ed.getFullYear() === this.currentYear();
    });
  }

  get filteredUpcoming(): CalendarEvent[] {
    let items = [...this.events()].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (this.filter() === 'urgent') items = items.filter(e => e.urgency === 'urgent' || e.urgency === 'critical');
    else if (this.filter() === 'pending') items = items.filter(e => new Date(e.date) > new Date());
    else if (this.filter() === 'completed') items = items.filter(e => new Date(e.date) < new Date());
    return items;
  }
}
