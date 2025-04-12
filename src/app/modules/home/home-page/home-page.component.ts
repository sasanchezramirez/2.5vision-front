import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [FormsModule, SharedModule]
})
export class HomePageComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;

  visibilityValue: number = 5;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onTabChange(tab: string): void {
    if (tab !== 'dashboard') {
      if (tab === 'login') {
        this.router.navigate(['/auth/login']);
      } else if (tab === 'register') {
        this.router.navigate(['/auth/register']);
      } else if (tab === 'about') {
        this.router.navigate(['/about']);
      } else {
        this.router.navigate(['/', tab]);
      }
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0];
      console.log('Archivo seleccionado:', this.selectedFile);
      // Aquí podrías procesar el archivo o enviarlo a un servidor
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      console.log('Archivo arrastrado:', this.selectedFile);
      // Aquí podrías procesar el archivo o enviarlo a un servidor
    }
  }

  onVisibilityChange(event: Event): void {
    // Actualizar el valor desde el evento
    const inputElement = event.target as HTMLInputElement;
    this.visibilityValue = parseInt(inputElement.value, 10);
  }
}
