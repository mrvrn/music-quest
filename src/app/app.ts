import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NowPlaying } from './now-playing/now-playing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NowPlaying],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('music-quest');
}
