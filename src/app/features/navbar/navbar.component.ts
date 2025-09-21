import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private router= inject(Router);
  public authService = inject(AuthenticationService);

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout() {
		this.authService.logout();
	}

  isSignupPage(): boolean {
    return this.router.url === '/signup';
  }
}
