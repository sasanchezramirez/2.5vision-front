import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
    console.log('ImagesService inicializado con URL:', this.baseUrl);
    console.log('¿Es ambiente de producción?', environment.production);
  }

  uploadImage(
    file: File,
    visibility_score: number,
    weather_tags: string,
    datetime_taken: Date = new Date(),
    uploader_username?: string
  ): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('datetime_taken', datetime_taken.toISOString());
    formData.append('visibility_score', visibility_score.toString());
    formData.append('weather_tags', weather_tags);

    if (uploader_username) {
      formData.append('uploader_username', uploader_username);
    }

    const url = `${this.baseUrl}/image/upload`;
    console.log('Enviando imagen a:', url);
    return this.http.post(url, formData);
  }
}
