import { __decorate } from "tslib";
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.loginPath = `${environment.apiUrl}identity/login`;
        this.registerPath = `${environment.apiUrl}identity/register`;
    }
    login(data) {
        return this.http.post(this.loginPath, data);
    }
    register(data) {
        return this.http.post(this.registerPath, data);
    }
    saveToken(token) {
        localStorage.setItem('token', token);
    }
    getToken() {
        return localStorage.getItem('token');
    }
    isAuthenticated() {
        if (this.getToken()) {
            return true;
        }
        return false;
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map