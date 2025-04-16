import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../enviroments/enviroment';
import { NewUserInput, NewUserResponse } from '../models/auth/user-registration.model';
import { AuthResponse, ApiErrorCode } from '../models/auth/responses.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Crea un nuevo usuario
   * @param userData Datos del nuevo usuario
   * @returns Observable con los datos del usuario creado
   */
  registerUser(userData: NewUserInput): Observable<NewUserResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/create-user`, userData)
      .pipe(
        map(response => {
          if (response.status && response.apiCode === ApiErrorCode.SUCCESS) {
            return response.data as NewUserResponse;
          } else {
            throw new Error(response.message);
          }
        }),
        catchError(this.handleError)
      );
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
