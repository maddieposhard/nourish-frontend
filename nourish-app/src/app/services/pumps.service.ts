import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pump } from '../models/pump';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PumpsService {
  private apiUrl = `${environment.apiUrl}/pumps`;

  constructor(private http: HttpClient) { }
  
  getPumps(): Observable<Pump[]> {
    return this.http.get<Pump[]>(this.apiUrl);
  }

  getPumpsByDate(date: string): Observable<Pump[]> {
    return this.http.get<Pump[]>(`${this.apiUrl}/by_date?date=${date}`);
  }

  createPump(pump: Partial<Pump>): Observable<Pump> {
    return this.http.post<Pump>(this.apiUrl, { pump });
  }
}
