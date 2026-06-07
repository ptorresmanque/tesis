export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  bio?: string;
  loadFactor: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Evaluation {
  id: string;
  title: string;
  course: string;
  courseId: string;
  dueDate: Date;
  complexity: number;
  status: 'pending' | 'in_progress' | 'completed' | 'graded' | 'past_due';
  grade?: number;
  maxGrade: number;
  reviewer?: string;
  description?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

export interface LoadMetric {
  currentLoad: number;
  maxLoad: number;
  pendingEvaluations: number;
  urgentCount: number;
  globalBalance: number;
  stdDeviation: number;
  riskPercentage: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  students: number;
  load: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  course: string;
  type: 'assignment' | 'exam' | 'review';
  urgency: 'normal' | 'urgent' | 'critical';
}

export interface BalanceConfig {
  algorithm: 'round_robin' | 'weighted' | 'genetic';
  weights: {
    volume: number;
    complexity: number;
    expertise: number;
    availability: number;
  };
  thresholds: {
    maxLoadPerStudent: number;
    minReviewsPerStudent: number;
    warningThreshold: number;
    criticalThreshold: number;
  };
  autoBalance: boolean;
}
