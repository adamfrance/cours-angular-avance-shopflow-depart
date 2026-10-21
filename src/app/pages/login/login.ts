import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '@shopflow/data-access';

@Component({
  selector: 'app-login',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly retour = inject(ActivatedRoute).snapshot.queryParamMap.get('retour') ?? '/catalogue';

  protected identifiant = '';
  protected motDePasse = '';
  protected readonly erreur$ = new BehaviorSubject('');

  protected connecter(): void {
    this.erreur$.next('');
    this.auth.login(this.identifiant, this.motDePasse).subscribe({
      next: () => this.router.navigateByUrl(this.retour),
      error: () => this.erreur$.next('Identifiant ou mot de passe incorrect.'),
    });
  }
}
