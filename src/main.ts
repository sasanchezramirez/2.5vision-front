import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './enviroments/enviroment';

if (environment.production) {
  enableProdMode();
  console.log('Producción habilitada. baseUrl:', environment.baseUrl);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
