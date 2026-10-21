import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Product } from '@shopflow/models';
import { ProductService } from '@shopflow/data-access';

/** Charge le produit avant d'afficher la fiche. */
export const productResolver: ResolveFn<Product> = (route) => {
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));
  return inject(ProductService).getById(id).pipe(
    catchError(() => of(new RedirectCommand(router.parseUrl('/catalogue')))),
  );
};
