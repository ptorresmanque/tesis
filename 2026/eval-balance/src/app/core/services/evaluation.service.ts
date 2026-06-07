import { Injectable, signal } from '@angular/core';
import { Evaluation, LoadMetric, Course, CalendarEvent } from '../models/user.model';
import { Observable, of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EvaluationService {
  private evaluations = signal<Evaluation[]>(this.getMockEvaluations());
  private loadMetric = signal<LoadMetric>({
    currentLoad: 2.8, maxLoad: 5.0, pendingEvaluations: 47, urgentCount: 12,
    globalBalance: 89, stdDeviation: 0.42, riskPercentage: 23
  });
  private courses = signal<Course[]>([
    { id: 'c1', name: 'Ingeniería de Software', code: 'INF-324', students: 45, load: 3.2 },
    { id: 'c2', name: 'Bases de Datos', code: 'INF-215', students: 52, load: 2.8 },
    { id: 'c3', name: 'Redes de Computadores', code: 'INF-431', students: 38, load: 4.1 },
    { id: 'c4', name: 'Inteligencia Artificial', code: 'INF-542', students: 30, load: 2.1 },
  ]);
  private calendarEvents = signal<CalendarEvent[]>(this.getMockEvents());

  readonly evaluationsSignal = this.evaluations.asReadonly();
  readonly loadMetricSignal = this.loadMetric.asReadonly();
  readonly coursesSignal = this.courses.asReadonly();
  readonly calendarEventsSignal = this.calendarEvents.asReadonly();

  getEvaluations(): Observable<Evaluation[]> {
    return of(this.evaluations()).pipe(delay(300));
  }

  getLoadMetric(): Observable<LoadMetric> {
    return of(this.loadMetric()).pipe(delay(200));
  }

  getCourses(): Observable<Course[]> {
    return of(this.courses()).pipe(delay(200));
  }

  getCalendarEvents(): Observable<CalendarEvent[]> {
    return of(this.calendarEvents()).pipe(delay(200));
  }

  private getMockEvaluations(): Evaluation[] {
    const now = new Date();
    return [
      { id: 'e1', title: 'Análisis de Requisitos', course: 'Ing. Software', courseId: 'c1', dueDate: new Date(now.getTime() + 86400000), complexity: 3, status: 'pending', maxGrade: 100, reviewer: 'Ana García' },
      { id: 'e2', title: 'Diseño de Base de Datos', course: 'Bases de Datos', courseId: 'c2', dueDate: new Date(now.getTime() + 172800000), complexity: 4, status: 'in_progress', maxGrade: 100, reviewer: 'Carlos López' },
      { id: 'e3', title: 'Arquitectura MVC', course: 'Ing. Software', courseId: 'c1', dueDate: new Date(now.getTime() - 86400000), complexity: 2, status: 'past_due', maxGrade: 50, reviewer: 'María Torres' },
      { id: 'e4', title: 'Normalización', course: 'Bases de Datos', courseId: 'c2', dueDate: new Date(now.getTime() + 259200000), complexity: 3, status: 'completed', maxGrade: 80, grade: 72, reviewer: 'Pedro Martínez' },
      { id: 'e5', title: 'Protocolos TCP/IP', course: 'Redes', courseId: 'c3', dueDate: new Date(now.getTime() + 43200000), complexity: 5, status: 'pending', maxGrade: 100, reviewer: 'Laura Sánchez' },
      { id: 'e6', title: 'ML Supervisado', course: 'IA', courseId: 'c4', dueDate: new Date(now.getTime() - 172800000), complexity: 4, status: 'graded', maxGrade: 100, grade: 88, reviewer: 'Jorge Ruiz' },
    ];
  }

  private getMockEvents(): CalendarEvent[] {
    const now = new Date();
    return [
      { id: 'ev1', title: 'Entrega Análisis UML', date: new Date(now.getTime() + 86400000), course: 'Ing. Software', type: 'assignment', urgency: 'urgent' },
      { id: 'ev2', title: 'Examen Parcial BD', date: new Date(now.getTime() + 43200000), course: 'Bases de Datos', type: 'exam', urgency: 'critical' },
      { id: 'ev3', title: 'Revisión Peer Review', date: new Date(now.getTime() + 259200000), course: 'Redes', type: 'review', urgency: 'normal' },
    ];
  }
}
