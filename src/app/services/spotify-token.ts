import { Injectable } from '@angular/core';
import { SpotifyToken } from '../models/spotify-token';
@Injectable({
    providedIn: 'root',
})
export class SpotifyTokenService {
    //TODO: Add token handling logic here
    spotifyToken?: SpotifyToken;

    storeToken = (data: SpotifyToken) => {
        this.spotifyToken = data;
        sessionStorage.setItem('spotifyToken', JSON.stringify(this.spotifyToken));
    };

    getStoredToken = (): SpotifyToken | null => {
        const token = sessionStorage.getItem('spotifyToken');

        if (!token) {
            return null;
        }
        const spotifyTokenJson = JSON.parse(token);
        const spotifyToken = new SpotifyToken(
            spotifyTokenJson.accessToken,
            spotifyTokenJson.expiresIn,
            spotifyTokenJson.refreshToken,
            spotifyTokenJson.scope,
            spotifyTokenJson.tokenType,
        );

        this.spotifyToken = spotifyToken;
        return this.spotifyToken;
    };
}
