import { Component, OnInit, inject } from '@angular/core';
import { Baby } from '../../models/baby';
import { BabyService } from '../../services/baby.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-baby',
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatButtonModule, MatSelectModule],
  templateUrl: './baby.component.html',
  styleUrl: './baby.component.css',
  providers: [DatePipe]
})
export class BabyComponent implements OnInit {
  private babyService = inject(BabyService);
  babies = this.babyService.babies;
  newBaby: Partial<Baby> = { 
    name: '',            // initialize with empty string
    birthDate: null,  // initialize with today's date or null
    gender: ''              // initialize with empty string
  };
  showModal: boolean = false;

	ngOnInit(): void {
    this.babyService.getMyBabies();
	}

  addBaby() {
    this.babyService.createBaby}

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
