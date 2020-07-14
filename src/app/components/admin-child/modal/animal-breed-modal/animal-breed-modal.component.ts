import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnimalClass} from '../../../../models/animal-class';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-animal-breed-modal',
  templateUrl: './animal-breed-modal.component.html',
  styleUrls: ['./animal-breed-modal.component.css']
})
export class AnimalBreedModalComponent implements OnInit {

  form: FormGroup;
  id = '';
  name = '';
  animalClasses: AnimalClass[];
  animalClassesSelectedId: string;
  private dialogRef: MatDialogRef<AnimalBreedModalComponent>;

  constructor(
    private fb: FormBuilder,
    dialogRef: MatDialogRef<AnimalBreedModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dialogRef = dialogRef;
    this.id = data.id;
    this.name = data.name;
    this.animalClasses = data.animalClasses;
    this.animalClassesSelectedId = data.animalClassesSelectedId;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id],
      name: [this.name, [Validators.required]],
      animalClassId: [this.animalClassesSelectedId, [Validators.required]],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
