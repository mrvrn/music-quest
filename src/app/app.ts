import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NowPlaying } from './components/now-playing/now-playing';
import { SpotifyAuth } from './services/spotify-auth';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NowPlaying],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('music-quest');
    spotifyAuth = inject(SpotifyAuth);
}
