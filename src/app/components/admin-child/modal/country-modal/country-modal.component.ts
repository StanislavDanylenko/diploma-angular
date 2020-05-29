import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Graft} from '../../../../models/graft';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.css']
})
export class CountryModalComponent implements OnInit {

  form: FormGroup;
  id = '';
  name = '';
  description = '';
  countryGrafts: Graft[];
  countryGraftsSelected: string[];
  private dialogRef: MatDialogRef<CountryModalComponent>;

  constructor(
    private fb: FormBuilder,
    dialogRef: MatDialogRef<CountryModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dialogRef = dialogRef;
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.countryGrafts = data.countryGrafts;
    this.countryGraftsSelected = data.countryGraftsSelected;
    console.log(data);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id],
      name: [this.name, [Validators.required]],
      description: [this.description, [Validators.required]],
      graftIds: [this.countryGraftsSelected, [Validators.required]],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
