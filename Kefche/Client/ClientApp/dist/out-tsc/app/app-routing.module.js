import { __decorate } from "tslib";
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './user/register/register.component';
import { RouterModule } from '@angular/router';
const routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // { path: 'create', component SomeComponent, canActivate: [AuthGuardService]}
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map