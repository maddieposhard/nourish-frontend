import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatButtonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  selectedDate = new Date();
  pumps: Pump[] = [];

  constructor(private pumpsService: PumpsService) {}

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


}
