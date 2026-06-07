import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { HeaderComponent } from '../../../shared/components/header/header';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatChipsModule, SidebarComponent, HeaderComponent],
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.css'],
})
export class HelpPage {
  searchQuery = signal('');
  contactSubject = signal('');
  contactMessage = signal('');

  categories = [
    { icon: 'play_circle', name: 'Primeros Pasos', desc: 'Guía inicial del sistema' },
    { icon: 'assignment', name: 'Evaluaciones', desc: 'Crear y gestionar evaluaciones' },
    { icon: 'balance', name: 'Balanceo de Carga', desc: 'Cómo funciona el balanceo automático' },
    { icon: 'analytics', name: 'Reportes', desc: 'Interpretar los reportes analíticos' },
    { icon: 'settings', name: 'Configuración', desc: 'Ajustar reglas de balanceo' },
    { icon: 'support', name: 'Soporte Técnico', desc: 'Contactar al equipo de soporte' },
  ];

  faqs = [
    { q: '¿Cómo funciona el balanceo automático?', a: 'El sistema utiliza un algoritmo híbrido que combina Round-Robin ponderado con un Algoritmo Genético ligero para distribuir las evaluaciones de manera equitativa entre los estudiantes, considerando factores como carga actual, expertise previa, complejidad de la rúbrica y disponibilidad.' },
    { q: '¿Qué significan los valores SHAP?', a: 'Los valores SHAP (SHapley Additive exPlanations) explican cómo cada factor contribuye a la asignación final de evaluaciones, permitiendo entender por qué un estudiante recibió determinada cantidad de revisiones.' },
    { q: '¿Cómo solicito una extensión de plazo?', a: 'Desde la página "Mis Evaluaciones", haga clic en el botón flotante (+) y complete el formulario con el motivo y la nueva fecha propuesta. El profesor recibirá la solicitud y podrá aprobarla o rechazarla.' },
    { q: '¿Qué métricas se usan para medir la carga?', a: 'El sistema mide la carga usando un modelo multifactorial que incluye: volumen de evaluaciones, complejidad temporal, expertise del evaluador y disponibilidad actual. Estas métricas se combinan en la ecuación: Carga = V × T × (1/E).' },
    { q: '¿Cómo se protegen mis datos?', a: 'EvalBalance cumple con la normativa LGPD/GDPR. Todos los datos se transmiten con encriptación SSL/TLS, las contraseñas se almacenan con hash bcrypt y el acceso se controla mediante autenticación JWT con roles (RBAC).' },
    { q: '¿Puedo ajustar manualmente las asignaciones?', a: 'Sí, desde la página "Asignador Automático", después de ejecutar el balanceo, puede ajustar manualmente las asignaciones arrastrando y soltando las filas en la tabla interactiva.' },
  ];

  constructor(public authService: AuthService, public router: Router) {}

  get filteredFaqs() {
    if (!this.searchQuery()) return this.faqs;
    const q = this.searchQuery().toLowerCase();
    return this.faqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }

  sendContact(): void {
    alert('Mensaje enviado al equipo de soporte. Recibirás respuesta en 24-48 hrs.');
    this.contactSubject.set('');
    this.contactMessage.set('');
  }
}
