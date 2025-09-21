import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { MatDialog } from '@angular/material/dialog';
import { FeedsService } from '../../services/feeds.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { CalendarComponent } from '../../features/calendar/calendar.component';
import { BabyService } from '../../services/baby.service';

@Component({
  selector: 'app-feeds',
  imports: [DatePipe, TitleCasePipe, CalendarComponent],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.css',
  providers: [DatePipe],
})
export class FeedsComponent implements OnInit {
  private feedsService = inject(FeedsService);
  private babyService = inject(BabyService)
  private dialog = inject(MatDialog);
  private datePipe = inject(DatePipe);

  feeds = this.feedsService.feeds;
  babies = this.babyService.babies; 
  selectedDate = this.feedsService.selectedDate;

  ngOnInit() {
    this.feedsService.getFeedsByDate(this.selectedDate());
    this.babyService.getMyBabies();
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

  formatTime(time: string | number | null): string {
    let date: Date;

    if (typeof time === 'number') {
      date = new Date(time);
    } else {
      date = new Date(time!);

      // Adjust so the time is treated as local instead of UTC
      date = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes()
      );
    }

    return this.datePipe.transform(date, 'h:mm a') || '';
  }

  deleteFeed(feedId: number) {
    this.feedsService.deleteFeed(feedId).subscribe({
      next: () => {
        // Remove the deleted feed from the signal
        this.feeds.update((current) => current.filter((f) => f.id !== feedId));
      },
      error: (err) => console.error('Error deleting feed:', err),
    });
  }

  getBabyName(babyId: number) {
    const baby = this.babies()?.find(b => b.id === babyId);
    return baby ? baby.name : 'Unknown';
  }
  
}
