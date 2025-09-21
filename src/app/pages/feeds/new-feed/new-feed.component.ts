import { Component, OnInit, inject, signal } from '@angular/core';
import { Feed } from '../../../models/feed';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { BabyService } from '../../../services/baby.service';
import { Baby } from '../../../models/baby';

@Component({
  selector: 'app-new-feed',
  imports: [    
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatSelectModule,],
  templateUrl: './new-feed.component.html',
  styleUrl: './new-feed.component.css'
})
export class NewFeedComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<NewFeedComponent>);
  public babyService = inject(BabyService);
  babies = this.babyService.babies;

  feedForm = signal<Partial<Feed>>({
    date: new Date(), // default to today
    time: '',
    feed_type: 'bottle', // default type
    ounces: undefined,
    length: undefined,
    notes: '',
    baby_id: undefined
  });

  ngOnInit() {
    this.babyService.getMyBabies();
  }

  selectBaby(babyId: number) {
    this.feedForm.update((f) => ({ ...f, baby_id: babyId }));
  }

  cancel(): void {
    this.dialogRef.close(); // closes without returning data
  }

  save(): void {
    // Return form data to parent
    this.dialogRef.close(this.feedForm());
  }
}
