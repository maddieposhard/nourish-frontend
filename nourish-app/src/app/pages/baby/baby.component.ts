import { Component, OnInit } from '@angular/core';
import { Baby } from '../../models/baby';
import { BabyService } from '../../services/baby.service';

@Component({
  selector: 'app-baby',
  imports: [],
  templateUrl: './baby.component.html',
  styleUrl: './baby.component.css'
})
export class BabyComponent implements OnInit {
  babies: Baby[] = [];

	constructor(private babyService: BabyService) {}

	ngOnInit(): void {
		this.babyService.getBabies().subscribe({
			next: (babies) => {
        this.babies = babies;
				console.log(babies);
			},
			error: (error) => {
				console.error(error);
			},
		});
	}

}
