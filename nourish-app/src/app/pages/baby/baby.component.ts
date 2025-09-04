import { Component, OnInit } from '@angular/core';
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
  babies: Baby[] = [];
  newBaby: Partial<Baby> = { 
    name: '',            // initialize with empty string
    birthDate: null,  // initialize with today's date or null
    gender: ''              // initialize with empty string
  };
  showModal: boolean = false;

	constructor(private babyService: BabyService) {}

	ngOnInit(): void {
    this.loadBabies();
	}

  loadBabies() {
    this.babyService.getMyBabies().subscribe({
      next: babies => this.babies = babies,
      error: err => console.error(err),
    });
  }

  addBaby() {
    this.babyService.createBaby(this.newBaby as Baby).subscribe({
      next: baby => {
        this.babies.push(baby);
        this.showModal = false;
  
        // Reset newBaby after successful creation
        this.newBaby = { 
          name: '', 
          birthDate: null,   // reset to null so datepicker is empty
          gender: ''         // reset to empty string
        };
      },
      error: err => console.error('Failed to add baby', err)
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
