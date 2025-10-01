import { Injectable } from '@angular/core';
import { NavLink } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  navLinks: NavLink[] = [
    { path: '/dashboard/lecturer/modules', icon: 'book-outline', label: 'Modules' }
  ];
  
  settingsLink: NavLink[] = [
    { path: '/dashboard/lecturer/profile', icon: 'settings-outline', label: 'Profile' }
  ];
}
