import { Injectable } from '@angular/core';
import { NavLink } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  navLinks: NavLink[] = [
    { path: '/dashboard/admin/courses', icon: 'book-outline', label: 'Courses' },
    { path: '/dashboard/admin/lecturers', icon: 'people-outline', label: 'Lecturers' }
  ];

  settingsLink: NavLink[] = [
    { path: '/dashboard/admin/settings', icon: 'settings-outline', label: 'Settings' }
  ];
}
