import {Injectable} from '@angular/core';
import {Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

// dependencies
import * as moment from 'moment';
import {CookieService} from 'ngx-cookie-service';

import {Alert} from './shared/layout/dynamic/alert/alert';
import {AlertService} from './shared/layout/dynamic/alert/alert.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private alertService: AlertService) {}

    /**
     * Verify token existence
     * @param route Router Actived
     * @param state Params Actived
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.cookieService.check('token')) {
        return true;
      }
      this.notify(state.url);
    }

    /**
     * Verify token existence
     * @param route Router Actived
     * @param state Params Actived
     */
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.cookieService.check('token')) {
        return true;
      }
      this.notify(state.url);
    }

    /**
     * Redirects to account page
     * @param url Route actived
     */
    private notify(url: string): boolean {
      // this.alertService.setMensagem(new Alert('Sessão expirada', 400), true);
      this.router.navigate(['/acesso'], {queryParams: {returnUrl: url}});
      return false;
    }
}
