import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {

    const userRole = authService.getRole();

    if (userRole === 'client' && route.data['role'] && route.data['role'].includes('client')) {
      return true;
    }

    if (userRole === 'admin' && route.data['role'] && route.data['role'].includes('admin')) {
      return true;
    }

    if (userRole === 'client' && route.data['role'] && route.data['role'].includes('admin')) {
      router.navigate(['clientDashboard']);
      return true;
    }

    router.navigate(['notfound']);
    return false;

  } else {
    authService.clearLocalStorage();
    router.navigate(['login']);
    return false;
  }
};
