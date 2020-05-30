import {Component, EventEmitter, Inject, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AnimalClassModalComponent} from '../animal-class-modal/animal-class-modal.component';

@Component({
  selector: 'app-disease-modal',
  templateUrl: './disease-modal.component.html',
  styleUrls: ['./disease-modal.component.css']
})
export class DiseaseModalComponent implements OnInit {
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
