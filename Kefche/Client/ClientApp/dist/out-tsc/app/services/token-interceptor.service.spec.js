import { TestBed } from '@angular/core/testing';
import { TokenInterceptorService } from './token-interceptor.service';
describe('TokenInterceptorService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TokenInterceptorService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=token-interceptor.service.spec.js.map