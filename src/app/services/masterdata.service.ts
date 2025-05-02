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
}
