import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, CartService } from '@shopflow/data-access';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class Header {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly nbArticles = inject(CartService).nbArticles;
  protected readonly utilisateur = toSignal(this.auth.user$);

  protected deconnecter(): void {
    this.auth.logout();
    this.router.navigateByUrl('/catalogue');
  }
}
