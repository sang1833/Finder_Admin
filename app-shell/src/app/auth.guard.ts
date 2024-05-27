import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './app.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);

      return false;
    }
    return true;
  }
}

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(PermissionsService).canActivate(route, state);
};

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly router: Router
//   ) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     if (!this.authService.isLoggedIn()) {
//       this.router.navigate(['/login']);

//       return false;
//     }
//     return true;
//   }
// }
