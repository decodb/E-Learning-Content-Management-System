import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService } from '../../../../../services/admin/settings/settings.service';
import { UserUpdate } from '../../../../../services/admin/settings/settings.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-settings',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './update-settings.component.html',
  styleUrl: './update-settings.component.css'
})
export class UpdateSettingsComponent {
  message = signal<string>('');
  isLoading = signal<boolean>(false);
  
  constructor(private settingsService: SettingsService, private router: Router) {}

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    bio: new FormControl('', {
      validators: [Validators.required, Validators.minLength(15)]
    })
  })

  onSubmit() {
    if(this.form.invalid) return 

    const fields: UserUpdate = {
      email: this.form.value.email!,
      bio: this.form.value.bio!
    };

    this.isLoading.set(true);
    this.settingsService.updateUser(fields)
      .subscribe({
        next: ({ message, data }) => {
          this.message.set(message);
          localStorage.setItem('token', data);
          this.isLoading.set(false);
          setTimeout(() => {
            this.router.navigate(["/dashboard/admin/settings"])
          }, 2000);
        },
        error: ({error}) => {
          console.log(error);
          this.isLoading.set(false);
        }
      })
  }

  navigate() {
    this.router.navigate(["/dashboard/admin/settings"])
  }
}
