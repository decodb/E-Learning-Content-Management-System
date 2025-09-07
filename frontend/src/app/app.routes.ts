import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';

export const routes: Routes = [
    {
        path: 'signin',
        component: SignInComponent,
        title: 'E-Leaning | Sign in',
        
    }, 
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    }
];
