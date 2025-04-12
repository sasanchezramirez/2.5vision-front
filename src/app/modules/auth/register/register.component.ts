import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fullname: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;

  constructor(private router: Router) {}

  isFormValid(): boolean {
    return (
      this.fullname.trim() !== '' &&
      this.email.trim() !== '' &&
      this.username.trim() !== '' &&
      this.password.trim() !== '' &&
      this.password === this.confirmPassword &&
      this.acceptTerms
    );
  }

  register(): void {
    if (this.isFormValid()) {
      // Aquí implementaríamos la lógica real de registro
      console.log('Registro exitoso', {
        fullname: this.fullname,
        email: this.email,
        username: this.username
      });

      // Redirigir al login después del registro exitoso
      this.router.navigate(['/auth/login']);
    } else {
      // Manejo de error cuando el formulario no está validado
      // Aquí podríamos mostrar un mensaje de error
      console.error('Por favor completa todos los campos correctamente');
    }
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  onTabChange(tab: string): void {
    if (tab !== 'register') {
      if (tab === 'dashboard') {
        this.router.navigate(['/']);
      } else if (tab === 'login') {
        this.router.navigate(['/auth/login']);
      } else {
        this.router.navigate(['/auth', tab]);
      }
    }
  }
}
