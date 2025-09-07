import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getJwtToken();
  
  if(token) {
    req = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })

    return next(req)
  }

  return next(req);
};