import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MasterdataService, Contributor } from '../../../services/masterdata.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-insights-page',
  templateUrl: './insights-page.component.html',
  styleUrls: ['./insights-page.component.scss'],
  standalone: true,
  imports: [SharedModule, CommonModule]
})
export class InsightsPageComponent implements OnInit {
  totalContributions: number = 0;
  displayedContributions: number = 0;
  topContributors: Contributor[] = [];
  isLoading: boolean = true;
  contributorsLoading: boolean = true;
  errorMessage: string | null = null;
  contributorsError: string | null = null;
  animationStarted: boolean = false;
  totalImagesUploaded: number = 0;

  constructor(
    private router: Router,
    private masterdataService: MasterdataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Cargar datos de contribuciones del usuario
    this.loadUserContributions();

    // Cargar datos de top contribuidores
    this.loadTopContributors();

    // Cargar total de imágenes
    this.loadTotalImagesUploaded();
  }

  loadUserContributions(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.masterdataService.getTotalContributionsByUser().subscribe({
      next: (total) => {
        this.totalContributions = total;
        this.isLoading = false;
        // Iniciar la animación después de que se carguen los datos
        setTimeout(() => {
          this.startCountAnimation();
        }, 300);
      },
      error: (error) => {
        console.error('Error al cargar contribuciones:', error);
        this.errorMessage = 'No se pudieron cargar las contribuciones';
        this.isLoading = false;
        this.totalContributions = 0; // Valor por defecto
      }
    });
  }

  loadTopContributors(): void {
    this.contributorsLoading = true;
    this.contributorsError = null;

    this.masterdataService.getTopContributors().subscribe({
      next: (contributors) => {
        // Ordenar por total de imágenes subidas en orden descendente
        this.topContributors = contributors
          .sort((a, b) => b.total_images_uploaded - a.total_images_uploaded)
          .slice(0, 3); // Asegurar que solo tomamos los 3 primeros
        this.contributorsLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar top contribuidores:', error);
        this.contributorsError = 'No se pudo cargar el ranking de contribuidores';
        this.contributorsLoading = false;
      }
    });
  }

  // Método para enmascarar nombres de usuario
  maskUsername(username: string): string {
    if (!username || username.length <= 2) {
      return username;
    }

    const firstChar = username.charAt(0);
    const lastChar = username.charAt(username.length - 1);

    // Siempre usar exactamente 4 asteriscos
    return `${firstChar}****${lastChar}`;
  }

  onTabChange(tab: string): void {
    this.router.navigate([`/${tab}`]);
  }

  // Devuelve el color correspondiente según la posición
  getPositionColor(index: number): string {
    const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    return index < colors.length ? colors[index] : '#808080';
  }

  // Devuelve la clase para determinar la posición visual en el podio
  getPodiumClass(index: number): string {
    const positions = ['first', 'second', 'third'];
    return index < positions.length ? positions[index] : '';
  }

  // Crear animación para el contador
  startCountAnimation(): void {
    if (this.animationStarted) return;
    this.animationStarted = true;

    this.displayedContributions = 0;
    const duration = 1500; // ms
    const steps = 60;
    const increment = this.totalContributions / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      this.displayedContributions = Math.ceil(this.displayedContributions + increment);

      if (this.displayedContributions >= this.totalContributions) {
        this.displayedContributions = this.totalContributions;
        clearInterval(timer);
      }
    }, interval);
  }

  // Verifica si el nombre de usuario es el del usuario actual
  isCurrentUser(username: string): boolean {
    const currentUser = this.authService.getUsername();
    return currentUser?.toLowerCase() === username?.toLowerCase();
  }

  // Carga el total de imágenes subidas
  loadTotalImagesUploaded(): void {
    this.masterdataService.getTotalImagesUploaded().subscribe({
      next: (total) => {
        this.totalImagesUploaded = total;
      },
      error: (error) => {
        console.error('Error al cargar total de imágenes:', error);
        this.totalImagesUploaded = 0;
      }
    });
  }
}
