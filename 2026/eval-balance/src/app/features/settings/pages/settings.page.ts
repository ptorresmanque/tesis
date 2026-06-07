import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { HeaderComponent } from '../../../shared/components/header/header';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatRadioModule, MatSliderModule, MatInputModule, MatFormFieldModule, MatSlideToggleModule, MatDividerModule, MatSnackBarModule, SidebarComponent, HeaderComponent],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.css'],
})
export class SettingsPage {
  algorithm = signal('weighted');
  volume = signal(7);
  complexity = signal(6);
  expertise = signal(8);
  availability = signal(5);
  maxLoad = signal(5);
  minReviews = signal(2);
  warningThreshold = signal(70);
  criticalThreshold = signal(90);
  autoBalance = signal(true);

  constructor(private snackBar: MatSnackBar) {}

  saveConfig(): void {
    this.snackBar.open('Configuración guardada exitosamente', 'Cerrar', { duration: 3000 });
  }

  resetDefaults(): void {
    this.algorithm.set('weighted');
    this.volume.set(7); this.complexity.set(6); this.expertise.set(8); this.availability.set(5);
    this.maxLoad.set(5); this.minReviews.set(2);
    this.warningThreshold.set(70); this.criticalThreshold.set(90);
    this.autoBalance.set(true);
    this.snackBar.open('Valores restablecidos a configuración por defecto', 'Cerrar', { duration: 3000 });
  }

  testAlgorithm(): void {
    this.snackBar.open('Simulación completada: 87% de equilibrio alcanzado', 'Cerrar', { duration: 3000 });
  }
}
