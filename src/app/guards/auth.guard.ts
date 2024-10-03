import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const cookies = inject(CookieService);
  const token = cookies.get('token');
  const router = inject(Router);
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
