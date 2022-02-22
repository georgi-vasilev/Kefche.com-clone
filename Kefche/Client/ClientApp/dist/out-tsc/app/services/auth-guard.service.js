import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthGuardService = class AuthGuardService {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate() {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['login']);
            return false;
        }
    }
};
AuthGuardService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuardService);
export { AuthGuardService };
//# sourceMappingURL=auth-guard.service.js.map