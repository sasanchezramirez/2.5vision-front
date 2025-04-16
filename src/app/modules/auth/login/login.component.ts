import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(): void {
    // Aquí implementaríamos la lógica de autenticación real
    console.log('Intentando iniciar sesión con:', this.username);
    if (this.username && this.password) {
      // Simular login exitoso
      console.log('Login exitoso');
      this.router.navigate(['/']);
    }
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
