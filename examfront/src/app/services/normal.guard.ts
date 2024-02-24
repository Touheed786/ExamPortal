import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const normalGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const login = inject(LoginService);
  if(login.isLogedIn() && login.getUserRole() == 'NORMAL')
    {
      return true;
    }
    router.navigate(["/login"]);
    return false;
};
