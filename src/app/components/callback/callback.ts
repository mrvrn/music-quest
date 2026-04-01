import { Component, inject } from '@angular/core';
import { SpotifyAuth } from '../../services/spotify-auth';
import { SpotifyTokenService } from '../../services/spotify-token';
@Component({
    selector: 'app-callback',
    imports: [],
    templateUrl: './callback.html',
    styleUrl: './callback.css',
})
export class Callback {
    spotifyAuth = inject(SpotifyAuth);
    spotifyTokenService = inject(SpotifyTokenService);

    ngOnInit() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            const data = this.spotifyAuth.getToken(code);

            data.subscribe((token) => {
                this.spotifyTokenService.storeToken(token);
            });
        } else {
            throw new Error('No code found in callback URL');
        }
    }
}
