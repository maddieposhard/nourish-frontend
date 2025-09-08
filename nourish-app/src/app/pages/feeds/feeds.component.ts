import { Component } from '@angular/core';
import { NewFeedComponent } from '../new-feed/new-feed.component';
import { MatDialog } from '@angular/material/dialog';
import { FeedsService } from '../../services/feeds.service';
import { Feed } from '../../models/feed';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-feeds',
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.css'
})
export class FeedsComponent {
  selectedDate: Date = new Date();
  feeds: Feed[] = [];

  constructor(private feedsService: FeedsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadFeeds();
  }

  loadFeeds() {
    const dateStr = this.selectedDate.toISOString().split('T')[0];
    this.feedsService.getFeedsByDate(dateStr).subscribe({
      next: (feeds) => (this.feeds = feeds),
      error: (err) => console.error(err),
    });
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.loadFeeds();
  }

  openAddFeedDialog() {
    const dialogRef = this.dialog.open(NewFeedComponent, {
      data: { date: this.selectedDate }, // pass default date
    });

    dialogRef.afterClosed().subscribe((result: Feed) => {
      if (result) {
        const feedData: Feed = {
          ...result,
          date: new Date(result.date).toISOString().split('T')[0],
        };

        // Optimistically update the list
        this.feeds.push(feedData);

        this.feedsService.createFeed(feedData).subscribe({
          next: (savedFeed) => {
            const index = this.feeds.findIndex((f) => f === feedData);
            if (index > -1) this.feeds[index] = savedFeed;
          },
          error: () => {
            // remove the optimistic feed if API fails
            this.feeds = this.feeds.filter((f) => f !== feedData);
          },
        });
      }
    });
  }
}
