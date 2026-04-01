import { TestBed } from '@angular/core/testing';

import { SpotifyTokenService } from './spotify-token';

describe('SpotifyToken', () => {
    let service: SpotifyTokenService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SpotifyTokenService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
