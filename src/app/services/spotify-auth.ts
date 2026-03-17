import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class SpotifyAuth {
    codeVerifier: string;
    clientId: string;

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

    getToken = async (code: string) => {
        const codeVerifier = sessionStorage.getItem('spotifyCodeVerifier');

        if (!codeVerifier) {
            throw new Error('Missing Spotify code verifier. Please reconnect and try again.');
        }

        const url = 'https://accounts.spotify.com/api/token';
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: this.clientId,
                grant_type: 'authorization_code',
                code,
                redirect_uri: this.redirectUri,
                code_verifier: codeVerifier,
            }),
        };

        const body = await fetch(url, payload);
        const response = await body.json();

        sessionStorage.setItem('accessToken', response.access_token);
    };
}
