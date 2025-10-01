import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardService } from '../../../services/lecturer/dashboard/dashboard.service';
import { DashboardNavLinkComponent } from '../../../components/links/dashboard-nav-link/dashboard-nav-link.component';

@Component({
  selector: 'app-lecturer',
  imports: [RouterLink, RouterOutlet, DashboardNavLinkComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lecturer.component.html',
  styleUrl: './lecturer.component.css'
})
export class LecturerComponent {
  // services
  authService = inject(AuthService);
  private navLinksService = inject(DashboardService);

  // just attributes
  loggedInUser = this.authService.getLoggedInUser();
  showPopUp = signal<boolean>(false);
  mainLinks = this.navLinksService.navLinks;
  profileLinks = this.navLinksService.settingsLink;

  togglePopUp() {
    this.showPopUp.set(!this.showPopUp())
  }
}
