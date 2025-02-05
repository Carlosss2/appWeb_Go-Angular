import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ProductGateway } from './products/domain/models/gateway/product-gateway';
import { ProductApiService } from './products/infraestructure/driver-adapter/product-api.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // ✅ Importa la implementación

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: ProductGateway, useClass: ProductApiService }, // ✅ Inyecta la implementación correcta
    provideClientHydration(), provideAnimationsAsync()
  ]
};
