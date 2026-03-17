import { Component, inject } from '@angular/core';
import { SpotifyAuth } from '../../services/spotify-auth';
@Component({
    selector: 'app-callback',
    imports: [],
    templateUrl: './callback.html',
    styleUrl: './callback.css',
})
export class Callback {
    spotifyAuth = inject(SpotifyAuth);
    urlParams = new URLSearchParams(window.location.search);
    code = this.urlParams.get('code');

    constructor() {
        if (this.code) {
            this.spotifyAuth.getToken(this.code);
        }
    }
}
