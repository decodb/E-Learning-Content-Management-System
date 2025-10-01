import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavLink } from '../../../services/admin/dashboard/dashboard.model';

@Component({
  selector: 'app-dashboard-nav-link',
  imports: [RouterLink, RouterLinkActive],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard-nav-link.component.html',
  styleUrl: './dashboard-nav-link.component.css'
})
export class DashboardNavLinkComponent {
  inputLink = input.required<NavLink>();
}
