import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './confirmation.html',
})
export class Confirmation {
  private readonly params = inject(ActivatedRoute).snapshot.queryParamMap;
  protected readonly numero = this.params.get('numero');
  protected readonly total = Number(this.params.get('total'));
}
