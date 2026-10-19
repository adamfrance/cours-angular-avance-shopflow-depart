import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse, User } from '../models/user';
import { API_URL } from './api';

const CLE_SESSION = 'shopflow-session';

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly session = new BehaviorSubject<LoginResponse | null>(this.lire());
  readonly user$ = this.session.asObservable();

  get token(): string | null {
    return this.session.value?.accessToken ?? null;
  }

  get userId(): number | null {
    return this.session.value?.id ?? null;
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/auth/login`, { username, password, expiresInMins: 60 })
      .pipe(
        tap((reponse) => {
          localStorage.setItem(CLE_SESSION, JSON.stringify(reponse));
          this.session.next(reponse);
        }),
      );
  }

  me(): Observable<User> {
    return this.http.get<User>(`${API_URL}/auth/me`);
  }

  logout(): void {
    localStorage.removeItem(CLE_SESSION);
    this.session.next(null);
  }

  private lire(): LoginResponse | null {
    const brut = localStorage.getItem(CLE_SESSION);
    return brut ? JSON.parse(brut) : null;
  }
}
