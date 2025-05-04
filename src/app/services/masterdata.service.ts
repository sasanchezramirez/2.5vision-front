import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../enviroments/enviroment';

interface ApiResponse<T> {
  apiCode: string;
  data: T;
  message: string;
  status: boolean;
}

export interface Contributor {
  id: number;
  username: string;
  total_images_uploaded: number;
}

@Injectable({
  providedIn: 'root'
})
export class MasterdataService {
  private apiUrl = environment.apiUrl || 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el total de contribuciones del usuario actual
   * @returns Observable con el número de contribuciones
   */
  getTotalContributionsByUser(): Observable<number> {
    // Obtener el username del localStorage y convertirlo a minúsculas
    const username = (localStorage.getItem('username') || '').toLowerCase();

    return this.http.get<ApiResponse<number>>(
      `${this.apiUrl}/masterdata/total-contributions-by-user?username=${username}`
    ).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtiene el top de contribuidores de la plataforma
   * @returns Observable con la lista de los 3 contribuidores principales
   */
  getTopContributors(): Observable<Contributor[]> {
    return this.http.get<ApiResponse<Contributor[]>>(
      `${this.apiUrl}/masterdata/top-contributors`
    ).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtiene el total de imágenes subidas a la plataforma
   * @returns Observable con el número total de imágenes
   */
  getTotalImagesUploaded(): Observable<number> {
    return this.http.get<ApiResponse<number>>(
      `${this.apiUrl}/masterdata/total-images-uploaded`
    ).pipe(
      map(response => response.data)
    );
  }

  /**
   * Enmascara un nombre de usuario mostrando solo primera y última letra
   * @param username Nombre de usuario completo
   * @returns Nombre de usuario enmascarado
   */
  maskUsername(username: string): string {
    if (!username || username.length <= 2) {
      return username;
    }

    const firstChar = username.charAt(0);
    const lastChar = username.charAt(username.length - 1);
    const maskedPart = '*'.repeat(username.length - 2);

    return `${firstChar}${maskedPart}${lastChar}`;
  }
}
