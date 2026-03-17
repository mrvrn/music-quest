import { TestBed } from '@angular/core/testing';

import { SpotifyToken } from './spotify-token';

describe('SpotifyToken', () => {
    let service: SpotifyToken;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SpotifyToken);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
