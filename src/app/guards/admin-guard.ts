import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '@shopflow/data-access';

/** Réserve les pages enfants de l'administration au rôle « admin ». */
export const adminGuard: CanActivateChildFn = (_childRoute, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const versConnexion = router.createUrlTree(['/connexion'], { queryParams: { retour: state.url } });
  if (!auth.token) {
    return versConnexion;
  }
  return auth.me().pipe(
    map((utilisateur) => (utilisateur.role === 'admin' ? true : router.createUrlTree(['/catalogue']))),
    catchError(() => of(versConnexion)),
  );
};
