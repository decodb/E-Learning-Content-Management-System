import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AdminComponent } from './pages/dashboards/admin/admin.component';
import { LecturersComponent } from './pages/dashboards/admin/lecturers/lecturers.component';
import { SettingsComponent } from './pages/dashboards/admin/settings/settings.component';
import { authGuard } from './guards/auth/auth.guard';
import { AddLecturerComponent } from './pages/dashboards/admin/lecturers/add-lecturer/add-lecturer.component';

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
    },
    {
        path: 'dashboard/admin',
        component: AdminComponent,
        title: 'E-Learning | Admin',
        canActivate: [authGuard],
        children: [
            {
                path: 'lecturers',
                component: LecturersComponent,
                children: [
                    {
                        path: 'add',
                        component: AddLecturerComponent
                    }
                ]
            },
            {
                path: 'settings',
                component: SettingsComponent
            }
        ]
    }
];
