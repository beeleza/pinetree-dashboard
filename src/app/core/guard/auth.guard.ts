import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateToken().pipe(
    map(isValid => {
      if (isValid) {
        return true;
      } else {
        router.navigate(['/auth/login']);
        return false;
      }
    })
  );
};
