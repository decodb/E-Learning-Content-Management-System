import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-settings',
  imports: [RouterOutlet, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  authService = inject(AuthService)
  loggedInUser = this.authService.getLoggedInUser();
}
