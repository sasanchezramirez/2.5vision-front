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

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.topContributors.map(user => user.username),
        datasets: [{
          data: this.topContributors.map(user => user.contributions),
          backgroundColor: [
            '#4169E1',  // Azul real
            '#6495ED',  // Azul acero
            '#87CEEB'   // Azul cielo
          ],
          borderWidth: 0,
          borderRadius: 8,
          maxBarThickness: 50
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              display: true
            },
            ticks: {
              color: '#808080',
              font: {
                size: 12
              },
              padding: 10
            },
            border: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#ffffff',
              font: {
                size: 12,
                weight: 'bold'
              },
              padding: 10
            },
            border: {
              display: false
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
              size: 16,
              weight: 'bold'
            },
            padding: {
              bottom: 30
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            bodyFont: {
              size: 14
            },
            padding: 12,
            cornerRadius: 8,
            displayColors: false
          }
        }
      }
    });
  }
}
