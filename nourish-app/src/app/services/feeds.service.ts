import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Feed } from '../models/feed';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  private baseUrl = `${environment.apiUrl}/feeds`; 

  feeds = signal<Feed[]>([]);
  selectedDate = signal<Date>(new Date());

  constructor(private http: HttpClient) {}

  getFeedsByDate(date: Date) {
    this.selectedDate.set(date);
    const isoDate = date.toISOString().split('T')[0];
    this.http.get<Feed[]>(`${this.baseUrl}/by_date?date=${isoDate}`).subscribe({
      next: (data) => {this.feeds.set(data); console.log(data)},
      error: (err) => console.error('Error loading feeds by date:', err)
    });
  }
  

  createFeed(feed: Feed) {
    return this.http.post<Feed>(this.baseUrl, feed).subscribe({
      next: (createdFeed) => {
        this.feeds.update((current) => [...current, createdFeed]);
      },
      error: (err) => console.error('Error creating feed:', err)
    });
  }


  updateFeed(feed: Feed): Observable<Feed> {
    return this.http.put<Feed>(`${this.baseUrl}/${feed.id}`,  feed ).pipe(
      tap((updated) => {
        this.feeds.update(curr =>
          curr.map(f => f.id === updated.id ? updated : f)
        );
      })
    );
  }

  deleteFeed(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
