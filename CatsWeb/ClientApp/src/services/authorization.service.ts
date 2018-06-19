import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { Claims } from './claims';
import { Token } from './token';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationService {
    isLoggedIn = false;
    claims: Claims = new Claims();

  constructor(private http: HttpClient) {
    this.claims.sub = 'NA\\Guest';
  }

  login(): Observable<Claims> {
    return this.http.get<Token>('http://localhost:4000/api/token', {
          withCredentials: true
      }).pipe(
        tap(res => localStorage.setItem('id_token', res.token)),
        tap(res => localStorage.setItem('id_token_expires', res.expires)),
        tap(() => this.isLoggedIn = true),
        map(res => <Claims>this.parseJwt(res.token)),
        tap(claim => {
          this.claims = claim;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('id_token_expires');
    this.isLoggedIn = false;
  }

  parseJwt(token) {
    // TODO: npm i --save angular2-jwt
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
