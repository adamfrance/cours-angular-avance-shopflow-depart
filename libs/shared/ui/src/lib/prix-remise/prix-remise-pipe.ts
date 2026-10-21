import { Pipe, PipeTransform } from '@angular/core';
import { Product, prixRemise } from '@shopflow/models';

/** Prix d'un produit après remise. */
@Pipe({ name: 'prixRemise' })
export class PrixRemisePipe implements PipeTransform {
  transform(produit: Product): number {
    console.log('calcul du prix')
    return prixRemise(produit);
  }
}

