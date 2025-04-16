import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ChangePasswordInput } from '../../../models/auth/change-password.model';

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
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  resetPassword(): void {
    // Reiniciar mensajes
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Validar que las contraseñas coincidan
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas nuevas no coinciden';
      this.isLoading = false;
      return;
    }

    // Validar que todos los campos estén llenos
    if (!this.username || !this.oldPassword || !this.newPassword) {
      this.errorMessage = 'Todos los campos son obligatorios';
      this.isLoading = false;
      return;
    }

    // Validar longitud mínima de la nueva contraseña
    if (this.newPassword.length < 8) {
      this.errorMessage = 'La nueva contraseña debe tener al menos 8 caracteres';
      this.isLoading = false;
      return;
    }

    // Validar que la contraseña nueva sea diferente a la antigua
    if (this.oldPassword === this.newPassword) {
      this.errorMessage = 'La nueva contraseña debe ser diferente a la anterior';
      this.isLoading = false;
      return;
    }

    const changePasswordData: ChangePasswordInput = {
      username: this.username,
      old_password: this.oldPassword,
      new_password: this.newPassword
    };

    this.authService.changePassword(changePasswordData).subscribe({
      next: (userData) => {
        console.log('Contraseña actualizada con éxito', userData);
        this.successMessage = 'Contraseña actualizada con éxito';
        this.isLoading = false;

        // Redirigir al login después de un cambio exitoso
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error al cambiar contraseña', error);
        this.errorMessage = error.message || 'Error al cambiar la contraseña';
        this.isLoading = false;
      }
    });
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
