import { Component, inject } from '@angular/core';
import { SpotifyApi } from '../../services/spotify-api';

@Component({
    selector: 'app-now-playing',
    imports: [],
    templateUrl: './now-playing.html',
    styleUrl: './now-playing.css',
})
export class NowPlaying {
    tracks: Track[] = [
        {
            artist: 'Alex Warren',
            title: 'Never Be Far',
            album: "You'll Be Alright, Kid!",
        },
        {
            artist: 'Logic',
            title: 'Teleport',
            album: 'Ultra 85',
        },
    ];

    spotifyApi = inject(SpotifyApi);

    constructor() {
        this.spotifyApi.getArtistData('0fTSzq9jAh4c36UVb4V7CB').subscribe((artistData) => {
            console.log('Artist Data:', artistData);
        });
    }
}

export interface Track {
    artist: string;
    title: string;
    album: string;
}
