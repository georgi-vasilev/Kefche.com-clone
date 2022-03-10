import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let RegisterComponent = class RegisterComponent {
    constructor(formBuilder, authService) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.registerForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'email': ['', Validators.required],
            'password': ['', Validators.required],
        });
    }
    ngOnInit() {
    }
    register() {
        this.authService.register(this.registerForm.value);
    }
    get username() {
        return this.registerForm.get('username');
    }
    get email() {
        return this.registerForm.get('email');
    }
    get password() {
        return this.registerForm.get('password');
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.scss']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map