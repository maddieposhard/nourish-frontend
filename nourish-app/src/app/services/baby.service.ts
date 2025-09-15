import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Baby } from '../models/baby';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BabyService {
  babies = signal<Baby[]>([]);

	constructor(private http: HttpClient) {}

  getMyBabies() {
    const token = localStorage.getItem('token');
    this.http
      .get<Baby[]>(`${environment.apiUrl}/my_babies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (babies) => this.babies.set(babies),
        error: (err) => console.error('Failed to load babies', err),
      });
  }

  createBaby(baby: Partial<Baby>) {
    const token = localStorage.getItem('token');
    this.http
      .post<Baby>(`${environment.apiUrl}/babies`, { baby }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (newBaby) => this.babies.update((current) => [...current, newBaby]),
        error: (err) => console.error('Failed to create baby', err),
      });
  }

  deleteBaby(babyId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/babies/${babyId}`);
  }
}
