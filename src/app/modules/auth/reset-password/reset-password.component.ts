import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  username: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  resetPassword(): void {
    // Validar que las contraseñas coincidan
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas nuevas no coinciden';
      return;
    }

    // Validar que todos los campos estén llenos
    if (!this.username || !this.oldPassword || !this.newPassword) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    // Validar longitud mínima de la nueva contraseña
    if (this.newPassword.length < 8) {
      this.errorMessage = 'La nueva contraseña debe tener al menos 8 caracteres';
      return;
    }

    // Validar que la contraseña nueva sea diferente a la antigua
    if (this.oldPassword === this.newPassword) {
      this.errorMessage = 'La nueva contraseña debe ser diferente a la anterior';
      return;
    }

    // Aquí implementaríamos la lógica real para actualizar la contraseña
    // usando un servicio de autenticación

    // Simulación de éxito
    this.successMessage = 'Contraseña actualizada con éxito';
    this.errorMessage = '';

    // Redirigir al login después de un cambio exitoso
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 2000);
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  onTabChange(tab: string): void {
    if (tab !== 'reset-password') {
      if (tab === 'dashboard') {
        this.router.navigate(['/']);
      } else if (tab === 'about') {
        this.router.navigate(['/about']);
      } else {
        this.router.navigate(['/auth', tab]);
      }
    }
  }
}
