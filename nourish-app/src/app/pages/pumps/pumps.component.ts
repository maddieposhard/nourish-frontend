import { Component } from '@angular/core';
import { Pump } from '../../models/pump';
import { PumpsService } from '../../services/pumps.service';
import { CalendarComponent } from './calendar/calendar.component';
import { MatDialog } from '@angular/material/dialog';
import { NewPumpComponent } from '../new-pump/new-pump.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pumps',
  imports: [CalendarComponent],
  templateUrl: './pumps.component.html',
  styleUrl: './pumps.component.css'
})
export class PumpsComponent {
  selectedDate: Date = new Date();
  pumps = new BehaviorSubject<Pump[]>([]);
  
  constructor(private pumpsService: PumpsService, private dialog: MatDialog) {}
  
  ngOnInit() {
    this.loadPumps();
  }

  loadPumps() {
    const dateStr = this.selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
    this.pumpsService.getPumpsByDate(dateStr).subscribe({
      next: pumps => this.pumps.next(pumps)
    });
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.loadPumps();
  }

  openAddPumpDialog() {
    const dialogRef = this.dialog.open(NewPumpComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const pumpData = {
          ...result,
          date: new Date(result.date).toISOString().split('T')[0] // format for backend
        };

        // Call the service to save the new pump
        this.pumpsService.createPump(pumpData).subscribe({
          next: () => this.loadPumps(),
          error: err => console.error('Error adding pump:', err)
        });
      }
    });
  }
}
  

