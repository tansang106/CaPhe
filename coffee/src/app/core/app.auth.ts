import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from './token.service';
import { CONFIG } from './app.config'
@Injectable()
export class Auth implements CanActivate {
    constructor(
        private _tokenService: TokenService,
        private _router: Router
    ) { }
    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (this._tokenService.checkToken(CONFIG.TOKEN) === true) {
            return true;
        } else {
            this._router.navigate(['login']);
            return false;
        }
    }
}