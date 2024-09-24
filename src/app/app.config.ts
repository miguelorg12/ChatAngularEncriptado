import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({  timeOut: 1000, preventDuplicates: true, closeButton: true }),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom([BrowserAnimationsModule]),
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
