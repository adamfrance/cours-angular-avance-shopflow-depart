import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'sf-note',
  imports: [DecimalPipe],
  template: `<p class="carte-note">★ {{ valeur() | number: '1.1-1' }}</p>`,
})
export class Note {
  readonly valeur = input.required<number>();
}
