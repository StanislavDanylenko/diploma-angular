import {Component, EventEmitter, Inject, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-disease-modal',
  templateUrl: './disease-modal.component.html',
  styleUrls: ['./disease-modal.component.css']
})
export class DiseaseModalComponent {
  public breakpoint: number;

  form: FormGroup;
  fname: string;
  lname: string;

  private dialogRef: MatDialogRef<DiseaseModalComponent>;

  constructor(
    private fb: FormBuilder,
    dialogRef: MatDialogRef<DiseaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.dialogRef = dialogRef;

    this.fname = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
      IdProof: null,
      firstname: [this.fname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      lastname: [this.lname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      email: [null, [Validators.required, Validators.email]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }
}
