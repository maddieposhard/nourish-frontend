import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) {}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(`${environment.apiUrl}/users`);
	}

  getCurrentUser() {
		return this.http.get<User>('http://localhost:3000/profile');
	}
	
	updateCurrentUser(data: Partial<User>) {
		return this.http.put<User>('http://localhost:3000/profile', data);
	}

}
