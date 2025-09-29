import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lecturer',
  imports: [RouterLink, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lecturer.component.html',
  styleUrl: './lecturer.component.css'
})
export class LecturerComponent {
  authService = inject(AuthService);
  loggedInUser = this.authService.getLoggedInUser();
  showPopUp = signal<boolean>(false);

  togglePopUp() {
    this.showPopUp.set(!this.showPopUp())
  }
}
