import { Component, OnInit } from '@angular/core';
import { Baby } from '../../models/baby';
import { BabyService } from '../../services/baby.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  babies: Baby[] = [];

  constructor(private babyService: BabyService) {}

  ngOnInit(): void {
    this.babyService.getMyBabies().subscribe({
      next: (babies) => this.babies = babies,
      error: (err) => console.error('Failed to load babies:', err)
    });
  }

  
}
