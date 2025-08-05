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
}
