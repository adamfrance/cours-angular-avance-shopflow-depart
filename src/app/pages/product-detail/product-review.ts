import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Review } from '@shopflow/models';

@Component({
  selector: 'app-product-reviews',
  imports: [DatePipe],
  template: `
    <ul class="avis-liste">
      @for (a of avis(); track $index) {
        <li class="avis-item">
          <p>
            <strong>{{ a.reviewerName }}</strong> : {{ a.rating }}/5, le
            {{ a.date | date: 'longDate' }}
          </p>
          <p>{{ a.comment }}</p>
        </li>
      }
    </ul>
  `,
})
export class ProductReviews {
  readonly avis = input.required<Review[]>();
}
