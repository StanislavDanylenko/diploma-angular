import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  form: FormGroup;
  private dialogRef: MatDialogRef<UserModalComponent>;

  constructor(
    private fb: FormBuilder,
    dialogRef: MatDialogRef<UserModalComponent>
  ) {
    this.dialogRef = dialogRef;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validator: this.validateRepeatPassword,
      });
  }

  validateRepeatPassword(group: FormGroup): ValidationErrors | null {
    const password = group.get('password');
    const repeatPassword = group.get('repeatPassword');

    if (password.value !== repeatPassword.value) {
      repeatPassword.setErrors({validateRepeatPassword: true});
    }
    return null;
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
