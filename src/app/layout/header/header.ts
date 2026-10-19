import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class Header {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly nbArticles$ = inject(CartService).count$;
  protected readonly utilisateur$ = this.auth.user$;

  protected deconnecter(): void {
    this.auth.logout();
    this.router.navigateByUrl('/catalogue');
  }
}
