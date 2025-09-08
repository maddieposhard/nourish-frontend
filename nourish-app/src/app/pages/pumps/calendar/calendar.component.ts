import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PumpsService } from '../../../services/pumps.service';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatButtonModule, DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  private pumpsService = inject(PumpsService);

  selectedDate = this.pumpsService.selectedDate;
  pumps = this.pumpsService.pumps;


  ngOnInit() {
    this.pumpsService.getPumpsByDate(this.selectedDate());
  }

  onDateSelected(date: Date) {
    if (!date) return;
    this.pumpsService.getPumpsByDate(date);
  }

}
