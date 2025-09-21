import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PumpsService } from '../../services/pumps.service';

@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [DatePipe],
})
export class CalendarComponent implements OnInit{
  @Output() dateChange = new EventEmitter<Date>(); // new
  @Input() selectedDate: Date | null = null;

  ngOnInit(): void {
    if (!this.selectedDate) {
      this.selectedDate = new Date(); // default to today if not provided
    }
  }
  onDateSelected(date: Date) {
    if (!date) return;
    this.selectedDate = date;
    this.dateChange.emit(date); // emit to parent
  }
}
