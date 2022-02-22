import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
let UserModule = class UserModule {
};
UserModule = __decorate([
    NgModule({
        declarations: [
            LoginComponent,
            RegisterComponent
        ],
        imports: [
            CommonModule,
            ReactiveFormsModule,
        ],
        exports: [
            LoginComponent,
            RegisterComponent
        ]
    })
], UserModule);
export { UserModule };
//# sourceMappingURL=user.module.js.map