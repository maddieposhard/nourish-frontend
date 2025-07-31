import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  users: User[] = [];

	constructor(private userService: UserService) {}

	ngOnInit(): void {
		this.userService.getUsers().subscribe({
			next: (users) => {
        this.users = users;
				console.log(users);
			},
			error: (error) => {
				console.error(error);
			},
		});
	}
}

