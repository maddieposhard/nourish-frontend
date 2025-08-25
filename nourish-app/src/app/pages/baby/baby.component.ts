import { Component, OnInit } from '@angular/core';
import { Baby } from '../../models/baby';
import { BabyService } from '../../services/baby.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-baby',
  imports: [FormsModule],
  templateUrl: './baby.component.html',
  styleUrl: './baby.component.css'
})
export class BabyComponent implements OnInit {
  babies: Baby[] = [];
  newBaby: Partial<Baby> = { name: '' };
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
        this.newBaby = { name: '' };
      },
      error: err => console.error('Failed to add baby', err)
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
