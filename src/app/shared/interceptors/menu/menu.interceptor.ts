import { HttpInterceptorFn } from '@angular/common/http';

export const menuInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  let modifiedReq = req;

  if(token){
    modifiedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    });
  }
  return next(modifiedReq);
};
