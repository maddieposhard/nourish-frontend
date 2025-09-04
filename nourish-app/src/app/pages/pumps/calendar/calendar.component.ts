import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Pump } from '../../../models/pump';
import { PumpsService } from '../../../services/pumps.service';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatButtonModule, DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  selectedDate = new Date();
  pumps: Pump[] = [];

  constructor(private pumpsService: PumpsService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.loadPumpsForDate(this.selectedDate);
  }

  onDateSelected(date: Date) {
    if (!date) return;
    this.selectedDate = date;
    this.loadPumpsForDate(date);
  }

  loadPumpsForDate(date: Date) {
    const isoDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    this.pumpsService.getPumpsByDate(isoDate).subscribe(pumps => {
      this.pumps = pumps;
    });
  }

  formatTime(time: string | number | null): string {
    let date: Date;
  
    if (typeof time === 'number') {
      date = new Date(time);
    } else {
      date = new Date(time!);
  
      // Adjust so the time is treated as local instead of UTC
      date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes());
    }
  
    return this.datePipe.transform(date, 'h:mm a') || '';
  }

}
