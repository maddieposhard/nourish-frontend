import { Component, inject } from '@angular/core';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { MatDialog } from '@angular/material/dialog';
import { FeedsService } from '../../services/feeds.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { CalendarComponent } from '../../features/calendar/calendar.component';

@Component({
  selector: 'app-feeds',
  imports: [DatePipe, TitleCasePipe, CalendarComponent],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.css',
})
export class FeedsComponent {
  private feedsService = inject(FeedsService);
  private dialog = inject(MatDialog);

  feeds = this.feedsService.feeds;
  selectedDate = this.feedsService.selectedDate;

  ngOnInit() {
    this.feedsService.getFeedsByDate(this.selectedDate());
  }

  onDateSelected(date: Date) {
    if (!date) return;
    this.feedsService.getFeedsByDate(date);
  }

  openAddFeedDialog() {
    const dialogRef = this.dialog.open(NewFeedComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const feedData = {
          ...result,
          date: new Date(result.date).toISOString().split('T')[0], // format for backend
        };

        // Call the service to save the new pump
        this.feedsService.createFeed(feedData);
      }
    });
  }
}
