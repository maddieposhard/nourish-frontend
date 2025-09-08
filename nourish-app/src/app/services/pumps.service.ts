import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Pump } from '../models/pump';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PumpsService {
  private apiUrl = `${environment.apiUrl}/pumps`;
  
  pumps = signal<Pump[]>([]);
  selectedDate = signal<Date>(new Date());

  constructor(private http: HttpClient) { }
  
  getPumps(): Observable<Pump[]> {
    return this.http.get<Pump[]>(this.apiUrl);
  }

  getPumpsByDate(date: Date) {
    this.selectedDate.set(date);
    const isoDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    this.http.get<Pump[]>(`${this.apiUrl}/by_date?date=${isoDate}`).subscribe({
      next: (data) => this.pumps.set(data),
      error: (err) => console.error('Error loading pumps by date:', err)
    });
  }

    createPump(pump: Pump) {
      return this.http.post<Pump>(this.apiUrl, pump).subscribe({
        next: (createdPump) => {
          this.pumps.update((current) => [...current, createdPump]);
        },
        error: (err) => console.error('Error creating pump:', err)
      });
    }

  deletePump(pumpId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${pumpId}`);
  }
}
