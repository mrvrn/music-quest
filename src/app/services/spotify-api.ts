import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { ArtistData, ArtistDataDto } from '../models/artist-data';
import { SpotifyToken, SpotifyTokenDto } from '../models/spotify-token';
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
            .post<SpotifyTokenDto>(this.tokenUrl + '/api/token', body.toString(), { headers })
            .pipe(
                map(SpotifyToken.fromDto),
                tap((token) => {
                    this.spotifyToken = token;
                }),
            );
    }

    //0fTSzq9jAh4c36UVb4V7CB
    public getArtistData(artistId: string): Observable<ArtistData> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.spotifyToken!.accessToken}`,
        });

        return this.http
            .get<ArtistDataDto>(this.baseUrl + `/artists/${artistId}`, { headers })
            .pipe(map(ArtistData.fromDto));
    }
}
