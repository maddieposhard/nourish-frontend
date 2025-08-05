import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log('Logged in with token:', res.token);
        this.authService.setToken(res.token);
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.error('Login error', error);
      },
    });
  }
}
