import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  authService = inject(AuthService);
  loggedInUser = this.authService.getLoggedInUser();
  showPopUp = signal<boolean>(false);

  togglePopUp() {
    this.showPopUp.set(!this.showPopUp())
  }
}
