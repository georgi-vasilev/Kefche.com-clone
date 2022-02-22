import { TestBed } from '@angular/core/testing';
import { BaseService } from './base.service';
describe('BaseService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BaseService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=base.service.spec.js.map