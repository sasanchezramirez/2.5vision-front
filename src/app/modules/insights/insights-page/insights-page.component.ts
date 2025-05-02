import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MasterdataService, Contributor } from '../../../services/masterdata.service';

@Component({
  selector: 'app-insights-page',
  templateUrl: './insights-page.component.html',
  styleUrls: ['./insights-page.component.scss'],
  standalone: true,
  imports: [SharedModule, CommonModule]
})
export class InsightsPageComponent implements OnInit {
  totalContributions: number = 0;
  topContributors: Contributor[] = [];
  isLoading: boolean = true;
  contributorsLoading: boolean = true;
  errorMessage: string | null = null;
  contributorsError: string | null = null;

  constructor(
    private router: Router,
    private masterdataService: MasterdataService
  ) { }

  ngOnInit(): void {
    // Cargar datos de contribuciones del usuario
    this.loadUserContributions();

    // Cargar datos de top contribuidores
    this.loadTopContributors();
  }

  loadUserContributions(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.masterdataService.getTotalContributionsByUser().subscribe({
      next: (total) => {
        this.totalContributions = total;
        this.isLoading = false;
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
    return this.masterdataService.maskUsername(username);
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
}
