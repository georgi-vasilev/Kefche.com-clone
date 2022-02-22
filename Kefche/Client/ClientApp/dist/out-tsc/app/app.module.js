import { __decorate } from "tslib";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserModule } from './user/user.module';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            AppRoutingModule,
            BrowserModule,
            CoreModule,
            HttpClientModule,
            UserModule,
            SharedModule
        ],
        providers: [
            AuthService,
            AuthGuardService,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptorService,
                multi: true
            }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map