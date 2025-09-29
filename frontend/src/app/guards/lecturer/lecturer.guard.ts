import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const lecturerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
    const router = inject(Router)
    
    if (authService.getLoggedInUser() && (authService.getLoggedInUser()?.role !== 'Lecturer')) {
      router.navigate(['/signin']);
      return false;
    }
  
    return true;
};
