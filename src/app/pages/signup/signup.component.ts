import { Component, inject, signal } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  user = signal({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  signupHandler(user: any) {
    if (!user.name || !user.email || !user.password || !user.password_confirmation) {
      alert('Please fill in all required fields.');
      return;
    }

    if (user.password !== user.password_confirmation) {
      alert('Passwords do not match.');
      return;
    }

    this.authService.signup({ user }).subscribe({
      next: () => {
        alert('Signup successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Signup failed. Please try again.');
      },
    });
  }
}


