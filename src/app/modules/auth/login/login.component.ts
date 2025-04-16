import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginInput } from '../../../models/auth/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login(): void {
    this.errorMessage = '';
    this.isLoading = true;

    // Validar entrada del usuario
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor ingresa tu usuario y contraseña';
      this.isLoading = false;
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres';
      this.isLoading = false;
      return;
    }

    const loginData: LoginInput = {
      username: this.username,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        this.isLoading = false;

        // Recargar la página para que se actualice el estado de autenticación
        // en todos los componentes
        window.location.href = '/';

        // Alternativa: Usar router para navegar programáticamente
        // this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error en login', error);
        this.errorMessage = error.message || 'Error al iniciar sesión';
        this.isLoading = false;
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  goToResetPassword(): void {
    this.router.navigate(['/auth/reset-password']);
  }

  onTabChange(tab: string): void {
    if (tab !== 'login') {
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
