import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SpotifyTokenService } from './spotify-token';
import { map, Observable, tap } from 'rxjs';
import { SpotifyToken, SpotifyTokenDto } from '../models/spotify-token';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SpotifyAuth {
    codeVerifier: string;
    clientId: string;
    spotifyToken?: SpotifyToken;

    private http = inject(HttpClient);
    spotifyTokenService = inject(SpotifyTokenService);

    tokenUrl = 'https://accounts.spotify.com';
    redirectUri = 'http://127.0.0.1:4200/callback';
    scope = 'user-read-private user-read-email';
    authUrl = new URL('https://accounts.spotify.com/authorize');

    constructor() {
        this.clientId = environment.clientId;
        this.codeVerifier = '';
    }

    async connect() {
        this.codeVerifier = this.generateRandomString(64);
        const hashed = await this.sha256(this.codeVerifier);
        const codeChallenge = this.pkcebase64encode(hashed);
        this.requestUserAuthorization(codeChallenge);
    }

    generateRandomString = (length: number): string => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], '');
    };

    sha256 = async (plain: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    };

    pkcebase64encode = (input: ArrayBuffer) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    };

    requestUserAuthorization = (codeChallenge: string) => {
        sessionStorage.setItem('spotifyCodeVerifier', this.codeVerifier);

        const params = {
            response_type: 'code',
            client_id: this.clientId,
            scope: this.scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: this.redirectUri,
        };

        this.authUrl.search = new URLSearchParams(params).toString();
        window.location.href = this.authUrl.toString();
    };

    getToken = (code: string): Observable<SpotifyToken> => {
        const codeVerifier = sessionStorage.getItem('spotifyCodeVerifier');

        if (!codeVerifier) {
            throw new Error('Missing Spotify code verifier. Please reconnect and try again.');
        }

        const body = new HttpParams()
            .set('client_id', this.clientId)
            .set('grant_type', 'authorization_code')
            .set('code', code)
            .set('redirect_uri', this.redirectUri)
            .set('code_verifier', codeVerifier);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        const data = this.http
            .post<SpotifyTokenDto>(this.tokenUrl + '/api/token', body.toString(), { headers })
            .pipe(map(SpotifyToken.fromDto));

        return data;
    };
}
