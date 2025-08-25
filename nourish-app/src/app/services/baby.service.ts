import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Baby } from '../models/baby';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BabyService {
	constructor(private http: HttpClient) {}

	getBabies(): Observable<Baby[]> {
		return this.http.get<Baby[]>(`${environment.apiUrl}/babies`);
	}

  getMyBabies(): Observable<Baby[]> {
    return this.http.get<Baby[]>(`${environment.apiUrl}/my_babies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  createBaby(baby: Baby) {
    const token = localStorage.getItem('token');
    return this.http.post<Baby>(`${environment.apiUrl}/babies`, baby, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
}
