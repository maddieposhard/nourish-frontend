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
    birthdate: null,  // initialize with today's date or null
    gender: ''              // initialize with empty string
  };
  showModal: boolean = false;

	ngOnInit(): void {
    this.babyService.getMyBabies();
	}

  addBaby() {
    this.babyService.createBaby(this.newBaby);
    this.toggleModal();
    this.newBaby = { name: '', birthdate: '', gender: '' }; // reset form
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  confirmDelete(babyId: number) {
    if (confirm("Are you sure you want to delete this baby? This action cannot be undone.")) {
      this.babyService.deleteBaby(babyId).subscribe({
        next: () => {
          // Remove the baby from the list to update the UI
          this.babies.set (this.babies().filter(b => b.id !== babyId)
          );
        },
        error: (err) => console.error("Error deleting baby:", err)
      });
    }
  }
}
