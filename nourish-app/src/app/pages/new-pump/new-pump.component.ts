import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Pump } from '../../models/pump';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-new-pump',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './new-pump.component.html',
  styleUrls: ['./new-pump.component.css']
})
export class NewPumpComponent {
  pumpForm: Partial<Pump> = {
    date: new Date(),
    time: '',
    length: null,
    ounces: null,
    notes: ''
  };

  constructor(public dialogRef: MatDialogRef<NewPumpComponent>) {}

  save() {
    this.dialogRef.close(this.pumpForm);
  }

  cancel() {
    this.dialogRef.close();
  }
}
