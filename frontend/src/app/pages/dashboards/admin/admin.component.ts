import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { SidebarService } from '../../../services/admin/dashboard/sidebar.service';
import { DashboardNavLinkComponent } from '../../../components/links/dashboard-nav-link/dashboard-nav-link.component';
@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, DashboardNavLinkComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  // services
  private authService = inject(AuthService);
  private navLinksService = inject(SidebarService);

  // just attributes
  loggedInUser = this.authService.getLoggedInUser();
  showPopUp = signal<boolean>(false);
  mainLinks = this.navLinksService.navLinks;
  settingsLink = this.navLinksService.settingsLink;

  togglePopUp() {
    this.showPopUp.set(!this.showPopUp())
  }
}
