import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;

  constructor(private router: Router) {}

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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
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

    if (event.dataTransfer?.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
      console.log('Archivo arrastrado:', this.selectedFile);
      // Aquí podrías procesar el archivo o enviarlo a un servidor
    }
  }
}
