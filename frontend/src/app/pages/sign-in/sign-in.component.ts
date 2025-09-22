import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, loginUser } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  showPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  private authService = inject(AuthService);

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword.set(!this.showPassword())
  }

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  })

  onSubmit() {

    if(this.form.invalid) return
    
    const userCredentials: loginUser = {
      email: this.form.value.email!,
      password: this.form.value.password!
    };

    this.isLoading.set(true);
    this.authService.login(userCredentials)
      .subscribe({
        next: ({ data }) => {
          localStorage.setItem('token', data)
          this.isLoading.set(false)
          this.router.navigate(['/dashboard/admin'])
        },
        error: ({ error }) => {
          console.log(error)
          const { message } = error;
          this.errorMessage.set(message)
          this.isLoading.set(false)
        }
      })
  }
}
