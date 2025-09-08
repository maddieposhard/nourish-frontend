import { Component, inject } from '@angular/core';
import { PumpsService } from '../../services/pumps.service';
import { CalendarComponent } from './calendar/calendar.component';
import { MatDialog } from '@angular/material/dialog';
import { NewPumpComponent } from './new-pump/new-pump.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-pumps',
  imports: [CalendarComponent, CommonModule],
  templateUrl: './pumps.component.html',
  styleUrl: './pumps.component.css',
  providers: [DatePipe],
})
export class PumpsComponent {
  private pumpsService = inject(PumpsService);
  private dialog = inject(MatDialog);
  private datePipe = inject(DatePipe);

  pumps = this.pumpsService.pumps;
  selectedDate = this.pumpsService.selectedDate;

  onDateSelected(date: Date) {
    if (!date) return;
    this.pumpsService.getPumpsByDate(date); // signal updates automatically
  }

  openAddPumpDialog() {
    const dialogRef = this.dialog.open(NewPumpComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const pumpData = {
          ...result,
          date: new Date(result.date).toISOString().split('T')[0], // format for backend
        };

        // Call the service to save the new pump
        this.pumpsService.createPump(pumpData);
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

  deletePump(pumpId: number) {
    this.pumpsService.deletePump(pumpId).subscribe({
      next: () => {
        // Remove the deleted pump from the signal
        this.pumps.update(current => current.filter(p => p.id !== pumpId));
      },
      error: err => console.error('Error deleting pump:', err)
    });
  }
}
