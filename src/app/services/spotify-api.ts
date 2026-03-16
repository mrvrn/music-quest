import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { ArtistData } from '../models/artist-data';
import { SpotifyToken } from '../models/spotify-token';
@Injectable({
    providedIn: 'root',
})
export class SpotifyApi {
    private http = inject(HttpClient);

    tokenUrl = 'https://accounts.spotify.com';
    baseUrl = 'https://api.spotify.com/v1';
    clientId: string;
    clientSecret: string;
    spotifyToken?: SpotifyToken;

    constructor() {
        this.clientId = environment.clientId;
        this.clientSecret = environment.clientSecret;
    }

    public getAccessToken(): Observable<SpotifyToken> {
        const body = new HttpParams()
            .set('grant_type', 'client_credentials')
            .set('client_id', this.clientId)
            .set('client_secret', this.clientSecret);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        return this.http
            .post<SpotifyToken>(this.tokenUrl + '/api/token', body.toString(), { headers })
            .pipe(
                tap((token) => {
                    this.spotifyToken = token;
                    console.log(this.spotifyToken.access_token);
                }),
            );
    }
    //0fTSzq9jAh4c36UVb4V7CB
    public getArtistData(artistId: string): Observable<ArtistData> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.spotifyToken!.access_token}`,
        });

        return this.http.get<ArtistData>(this.baseUrl + `/artists/${artistId}`, { headers });
    }
}
