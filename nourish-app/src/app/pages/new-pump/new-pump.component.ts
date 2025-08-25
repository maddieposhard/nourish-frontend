import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-pump',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule] // must be done in each standalone component that uses them, here and calendar
  ,templateUrl: './new-pump.component.html',
  styleUrl: './new-pump.component.css'
})
export class NewPumpComponent {
  pumpForm;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewPumpComponent>
  ) {
    this.pumpForm = this.fb.group({
      date: [new Date(), Validators.required],
      time: ['', Validators.required],
      length: ['', Validators.required],
      ounces: ['', Validators.required],
      notes: ['']
    });
  }

  save() {
    if (this.pumpForm.valid) {
      this.dialogRef.close(this.pumpForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
