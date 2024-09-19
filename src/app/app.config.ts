import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({  timeOut: 1000, preventDuplicates: true, closeButton: true }),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync()]
};
