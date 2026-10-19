import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected identifiant = '';
  protected motDePasse = '';
  protected readonly erreur$ = new BehaviorSubject('');

  protected connecter(): void {
    this.erreur$.next('');
    this.auth.login(this.identifiant, this.motDePasse).subscribe({
      next: () => this.router.navigateByUrl('/catalogue'),
      error: () => this.erreur$.next('Identifiant ou mot de passe incorrect.'),
    });
  }
}
