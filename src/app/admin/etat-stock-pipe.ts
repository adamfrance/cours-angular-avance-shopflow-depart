import { Pipe, PipeTransform } from '@angular/core';

/** Libellé de l'état du stock d'après la quantité disponible. */
@Pipe({ name: 'etatStock' })
export class EtatStockPipe implements PipeTransform {
  transform(stock: number): string {
    return stock === 0 ? 'Rupture' : stock < 10 ? 'Stock faible' : 'En stock';
  }
}
