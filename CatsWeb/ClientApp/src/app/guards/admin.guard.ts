import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthorizationService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isLoggedIn && this.authService.claims.CatsAdmin) {
        return true;
      } else {
        this.authService.login().subscribe(claims => {
          if (!claims.CatsAdmin) {
            this.router.navigate(['/unauthorized']);
          } else {
            if (next) {
              this.router.navigate(next.url.map(seg => seg.path));
            }
          }
        });
        return false;
      }
  }
}
