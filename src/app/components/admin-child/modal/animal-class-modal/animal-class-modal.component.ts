import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-animal-class-modal',
  templateUrl: './animal-class-modal.component.html',
  styleUrls: ['./animal-class-modal.component.css']
})
export class AnimalClassModalComponent implements OnInit {

  form: FormGroup;
  id = '';
  name = '';
  private dialogRef: MatDialogRef<AnimalClassModalComponent>;

  constructor(private fb: FormBuilder,
              dialogRef: MatDialogRef<AnimalClassModalComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.dialogRef = dialogRef;
    this.id = data.id;
    this.name = data.name;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id],
      name: [this.name, [Validators.required]],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
