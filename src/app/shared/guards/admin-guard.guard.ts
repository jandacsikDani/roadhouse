import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isTokenExpired } from '../../../../api/src/utils/token.utils';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const token = localStorage.getItem('token');

  if(token && !isTokenExpired(token)){
    return true;
  }

  router.navigate(['/admin']);
  return false;
};
