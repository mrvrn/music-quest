import { Routes } from '@angular/router';
import { Callback } from './components/callback/callback';

export const routes: Routes = [
    {
        path: 'callback',
        component: Callback,
        title: 'Spotify Callback',
    },
];
