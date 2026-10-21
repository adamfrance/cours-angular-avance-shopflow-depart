import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shopflow/data-access';

/** Laisse passer un utilisateur connecté ; sinon, renvoie vers la connexion en mémorisant la page demandée. */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.token
    ? true
    : router.createUrlTree(['/connexion'], { queryParams: { retour: state.url } });
};
