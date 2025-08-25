import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
	user = signal<User | null>(null);

	constructor(private userService: UserService) {}

	ngOnInit() {
		this.userService.getCurrentUser().subscribe(user => {
		  this.user.set(user);
		  console.log('Current user:', user);
		});
	  }
}