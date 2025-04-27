import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

interface UserContribution {
  username: string;
  contributions: number;
}

@Component({
  selector: 'app-insights-page',
  templateUrl: './insights-page.component.html',
  styleUrls: ['./insights-page.component.scss']
})
export class InsightsPageComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  chart: Chart | undefined;
  totalContributions: number = 0;
  topContributors: UserContribution[] = [];

  constructor() { }

  ngOnInit(): void {
    // Cargar datos de ejemplo
    this.loadContributionData();
  }

  ngAfterViewInit(): void {
    // Inicializar el gráfico después de que la vista esté lista
    this.initChart();
  }

  loadContributionData(): void {
    // Datos de ejemplo que normalmente vendrían de un servicio
    this.totalContributions = 42;

    this.topContributors = [
      { username: 'Usuario1', contributions: 78 },
      { username: 'Usuario2', contributions: 65 },
      { username: 'Usuario3', contributions: 52 }
    ];
  }

  initChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    // Definir colores para el tema oscuro
    const barColors = [
      'rgba(75, 192, 192, 0.8)',  // Verde azulado
      'rgba(54, 162, 235, 0.8)',  // Azul
      'rgba(255, 206, 86, 0.8)'   // Amarillo
    ];

    const borderColors = [
      'rgba(75, 192, 192, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)'
    ];

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.topContributors.map(user => user.username),
        datasets: [{
          data: this.topContributors.map(user => user.contributions),
          backgroundColor: barColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#cccccc'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#cccccc'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Top Contribuidores',
            color: '#ffffff',
            font: {
              size: 16
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1
          }
        }
      }
    });
  }
}
