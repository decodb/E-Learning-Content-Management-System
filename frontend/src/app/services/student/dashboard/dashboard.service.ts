import { Injectable } from '@angular/core';
import { NavLink } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  navLinks: NavLink[] = [
      { path: '/dashboard/student/modules', icon: 'book-outline', label: 'Modules' }
    ];
    
    settingsLink: NavLink[] = [
      { path: '/dashboard/student/profile', icon: 'settings-outline', label: 'Profile' }
    ];
}
