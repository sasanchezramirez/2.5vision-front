import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ImagesService } from '../../../services/images.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [FormsModule, SharedModule, CommonModule, HttpClientModule]
})
export class HomePageComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;
  selectedWeather: string = '';
  isUploading: boolean = false;
  visibilityValue: number = 5;
  previewUrl: string | ArrayBuffer | null = null;
  uploadSuccess: boolean = false;
  currentStep: number = 1;

  weatherOptions = [
    { value: 'tormenta', label: 'Tormenta' },
    { value: 'lluvia', label: 'Lluvia' },
    { value: 'brisa', label: 'Brisa' },
    { value: 'nublado', label: 'Nublado pero sin lluvia' },
    { value: 'soleado', label: 'Soleado' },
    { value: 'despejado', label: 'Totalmente despejado' }
  ];

  constructor(
    private router: Router,
    private imagesService: ImagesService,
    private authService: AuthService
  ) {}

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
      this.createImagePreview();
      console.log('Archivo seleccionado:', this.selectedFile);
      this.currentStep = 2;
    }
  }

  createImagePreview(): void {
    if (!this.selectedFile) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target?.result || null;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  removeSelectedFile(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.currentStep = 1;
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
      this.createImagePreview();
      console.log('Archivo arrastrado:', this.selectedFile);
      this.currentStep = 2;
    }
  }

  onVisibilityChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.visibilityValue = parseInt(inputElement.value, 10);

    if (this.selectedFile) {
      this.currentStep = 3;
    }
  }

  getUsernameFromLocalStorage(): string | null {
    return this.authService.getUsername();
  }

  uploadImage(): void {
    if (!this.selectedFile || !this.selectedWeather) {
      return;
    }

    this.isUploading = true;

    this.imagesService.uploadImage(
      this.selectedFile,
      this.visibilityValue,
      this.selectedWeather,
      new Date()
    ).subscribe({
      next: (response) => {
        console.log('Imagen subida con éxito:', response);
        this.isUploading = false;
        this.uploadSuccess = true;
        this.currentStep = 4;
      },
      error: (error) => {
        console.error('Error al subir la imagen:', error);
        this.isUploading = false;
        // Mostrar mensaje de error
        alert('Hubo un error al subir la imagen. Por favor, intente de nuevo.');
      }
    });
  }

  scrollToUploadSection(): void {
    const element = document.getElementById('uploadSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  resetForm(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.selectedWeather = '';
    this.visibilityValue = 5;
    this.uploadSuccess = false;
    this.currentStep = 1;

    setTimeout(() => {
      this.scrollToUploadSection();
    }, 100);
  }
}
