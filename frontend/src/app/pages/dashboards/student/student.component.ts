import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardNavLinkComponent } from '../../../components/links/dashboard-nav-link/dashboard-nav-link.component';
import { DashboardService } from '../../../services/student/dashboard/dashboard.service';

@Component({
  selector: 'app-student',
  imports: [RouterLink, RouterOutlet, DashboardNavLinkComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
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
