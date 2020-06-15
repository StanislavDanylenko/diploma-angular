import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-graft-modal',
  templateUrl: './graft-modal.component.html',
  styleUrls: ['./graft-modal.component.css']
})
export class GraftModalComponent implements OnInit {

  form: FormGroup;
  id = '';
  name = '';
  frequency: number;
  private dialogRef: MatDialogRef<GraftModalComponent>;

  constructor(private fb: FormBuilder,
              dialogRef: MatDialogRef<GraftModalComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.dialogRef = dialogRef;
    this.id = data.id;
    this.name = data.name;
    this.frequency = data.frequency;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id],
      name: [this.name, [Validators.required]],
      frequency: [this.frequency, [Validators.required]],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
