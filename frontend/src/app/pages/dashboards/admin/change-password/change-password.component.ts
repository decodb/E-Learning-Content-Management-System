import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  isLoading = signal<boolean>(false);
  showPassword = signal<boolean>(false);

  constructor(private  authService: AuthService, private router: Router) {}
  
  form = new FormGroup({
    old_password: new FormControl('', { validators: [Validators.required,Validators.minLength(3)]}),
    new_password: new FormControl('', { validators: [Validators.required, Validators.minLength(4)]}),
    confirm_new_password: new FormControl('', {validators: [Validators.required, Validators.email]})
  })

  onSubmit() {

  }

  togglePassword() {
    this.showPassword.set(!this.showPassword())
  }

  navigate() {
    this.router.navigate(["/dashboard/admin/settings"])
  }
}
