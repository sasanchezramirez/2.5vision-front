import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../enviroments/enviroment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Agrega un log para verificar el entorno
console.log('App Module - Ambiente cargado:', environment.production ? 'Producción' : 'Desarrollo');
console.log('App Module - URL API:', environment.baseUrl);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
