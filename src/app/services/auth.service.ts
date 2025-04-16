import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../enviroments/enviroment';

// Importaciones de modelos
import { LoginInput, LoginResponseData } from '../models/auth/login.model';
import { ChangePasswordInput } from '../models/auth/change-password.model';
import { UserData } from '../models/auth/user.model';
import { AuthResponse, ApiErrorCode } from '../models/auth/responses.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Realiza el login del usuario
   * @param loginData Datos de inicio de sesión
   * @returns Observable con los datos del usuario y token
   */
  login(loginData: LoginInput): Observable<LoginResponseData> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, loginData)
      .pipe(
        map(response => {
          if (response.status && response.apiCode === ApiErrorCode.SUCCESS) {
            const loginData = response.data as LoginResponseData;
            // Guardar en localStorage
            this.saveUserSession(loginData, loginData.access_token);
            return loginData;
          } else {
            throw new Error(response.message);
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Cambia la contraseña del usuario
   * @param passwordData Datos para cambio de contraseña
   * @returns Observable con los datos actualizados del usuario
   */
  changePassword(passwordData: ChangePasswordInput): Observable<UserData> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/change-password`,
      passwordData
    ).pipe(
      map(response => {
        if (response.status && response.apiCode === ApiErrorCode.SUCCESS) {
          return response.data as UserData;
        } else {
          throw new Error(response.message);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('token_type');
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns boolean indicando si hay un token válido
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  /**
   * Obtiene el token actual
   * @returns string con el token de autenticación
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Obtiene el ID del usuario actual
   * @returns string con el ID del usuario
   */
  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  /**
   * Obtiene el nombre de usuario actual
   * @returns string con el nombre de usuario
   */
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  /**
   * Guarda los datos de la sesión en localStorage
   * @param userData Datos del usuario
   * @param token Token de autenticación
   */
  private saveUserSession(userData: any, token: string): void {
    localStorage.setItem('auth_token', token);

    if (userData.id) {
      localStorage.setItem('user_id', userData.id.toString());
    }

    if (userData.username) {
      localStorage.setItem('username', userData.username);
    } else if (userData.access_token) {
      // Si no tenemos el username directamente, intentamos extraerlo del
      // código del token (debería enviarse en una respuesta separada)
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        if (tokenPayload.sub) {
          localStorage.setItem('username', tokenPayload.sub);
        }
      } catch (e) {
        console.error('Error decodificando token', e);
      }
    }

    if (userData.token_type) {
      localStorage.setItem('token_type', userData.token_type);
    }
  }

  /**
   * Maneja los errores de las peticiones HTTP
   * @param error Error HTTP
   * @returns Observable con el error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.error && error.error.apiCode) {
        switch (error.error.apiCode) {
          case ApiErrorCode.USER_EXISTS:
            errorMessage = 'El usuario ya existe';
            break;
          case ApiErrorCode.USER_NOT_FOUND:
            errorMessage = 'Usuario no encontrado';
            break;
          case ApiErrorCode.INVALID_PASSWORD:
            errorMessage = 'Contraseña inválida';
            break;
          default:
            errorMessage = error.error.message ||
              `Código: ${error.status}, mensaje: ${error.message}`;
        }
      } else {
        errorMessage = `Código: ${error.status}, mensaje: ${error.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
