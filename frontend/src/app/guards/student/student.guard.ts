import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const studentGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
    const router = inject(Router)
    
    if (authService.getLoggedInUser() && (authService.getLoggedInUser()?.role !== 'Student')) {
      router.navigate(['/signin']);
      return false;
    }
  
    return true;
};
