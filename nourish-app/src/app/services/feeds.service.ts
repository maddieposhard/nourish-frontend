import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from '../models/feed';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  private baseUrl = `${environment.apiUrl}/feeds`; 

  constructor(private http: HttpClient) {}

  getFeedsByDate(date: string): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.baseUrl}/feeds?date=${date}`);
  }

  createFeed(feed: Feed): Observable<Feed> {
    return this.http.post<Feed>(`${this.baseUrl}/feeds`, { feed });
  }

  updateFeed(feed: Feed): Observable<Feed> {
    return this.http.put<Feed>(`${this.baseUrl}/feeds/${feed.id}`, { feed });
  }

  deleteFeed(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/feeds/${id}`);
  }
}
