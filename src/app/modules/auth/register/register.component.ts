import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { NewUserInput } from '../../../models/auth/user-registration.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fullname: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  contactInfo: string = '';
  acceptTerms: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  usernameHasSpaces: boolean = false;

  // Por defecto, usamos estos valores para el registro
  private defaultProfileId: number = 1;
  private defaultStatusId: number = 1;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    // Validar username inicialmente
    this.validateUsername();
  }

  validateUsername(): void {
    this.usernameHasSpaces = this.username.includes(' ');
  }

  isFormValid(): boolean {
    return (
      this.username.trim() !== '' &&
      !this.usernameHasSpaces &&
      this.password.trim() !== '' &&
      this.password.length >= 8 &&
      this.password === this.confirmPassword &&
      this.contactInfo.trim() !== '' &&
      this.acceptTerms
    );
  }

  register(): void {
    // Reiniciar mensajes
    this.errorMessage = '';
    this.successMessage = '';

    // Verificar espacios en el username antes de continuar
    this.validateUsername();

    if (this.usernameHasSpaces) {
      this.errorMessage = 'El nombre de usuario no puede contener espacios';
      return;
    }

    if (this.isFormValid()) {
      this.isLoading = true;

      const userData: NewUserInput = {
        username: this.username,
        password: this.password,
        profile_id: this.defaultProfileId,
        status_id: this.defaultStatusId,
        contact_info: this.contactInfo
      };

      this.usersService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito', response);
          this.successMessage = 'Usuario registrado exitosamente';
          this.isLoading = false;

          // Redirigir al login después del registro exitoso
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error en el registro', error);
          this.errorMessage = error.message || 'Error al registrar el usuario';
          this.isLoading = false;
        }
      });
    } else {
      // Mostrar un mensaje de error si el formulario no es válido
      if (!this.username.trim()) {
        this.errorMessage = 'Por favor ingresa un nombre de usuario';
      } else if (this.usernameHasSpaces) {
        this.errorMessage = 'El nombre de usuario no puede contener espacios';
      } else if (!this.password.trim()) {
        this.errorMessage = 'Por favor ingresa una contraseña';
      } else if (this.password.length < 8) {
        this.errorMessage = 'La contraseña debe tener al menos 8 caracteres';
      } else if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
      } else if (!this.contactInfo.trim()) {
        this.errorMessage = 'Por favor ingresa información de contacto';
      } else if (!this.acceptTerms) {
        this.errorMessage = 'Debes aceptar los términos para continuar';
      }
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
