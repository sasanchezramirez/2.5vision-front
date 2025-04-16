import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    console.log('ImagesService inicializado con URL:', this.apiUrl);
    console.log('¿Es ambiente de producción?', environment.production);
  }

  /**
   * Convierte una fecha a hora colombiana (GMT-5)
   * @param date Fecha a convertir
   * @returns Fecha en zona horaria colombiana
   */
  private getColombianTime(date: Date = new Date()): Date {
    // Obtener la fecha actual en UTC
    const utcDate = new Date(date.toUTCString());

    // Ajustar a GMT-5 (Colombia)
    utcDate.setHours(utcDate.getHours() - 5);

    return utcDate;
  }

  uploadImage(
    file: File,
    visibility_score: number,
    weather_tags: string,
    datetime_taken: Date = new Date(),
    uploader_username?: string
  ): Observable<any> {
    const formData = new FormData();

    // Convertir a hora colombiana
    const colombianTime = this.getColombianTime(datetime_taken);
    console.log('Hora original:', datetime_taken.toISOString());
    console.log('Hora colombiana (GMT-5):', colombianTime.toISOString());

    formData.append('file', file);
    formData.append('datetime_taken', colombianTime.toISOString());
    formData.append('visibility_score', visibility_score.toString());
    formData.append('weather_tags', weather_tags);

    if (uploader_username) {
      formData.append('uploader_username', uploader_username);
    } else if (this.authService.isAuthenticated()) {
      const username = this.authService.getUsername();
      if (username) {
        console.log('Usuario autenticado, enviando con username:', username);
        formData.append('uploader_username', username);
      }
    }

    const url = `${this.apiUrl}/image/upload`;
    console.log('Enviando imagen a:', url);
    return this.http.post(url, formData);
  }
}
