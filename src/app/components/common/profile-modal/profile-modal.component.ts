import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Country} from '../../../models/country';
import {Localization} from '../../../models/localization';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {
  public breakpoint: number;

  profileF: FormGroup;
  profileP: FormGroup;
  country: string;
  countries: Country[];
  localization: string;
  localizations = [
    new Localization('ENGLISH', 'English'),
    new Localization('UKRAINIAN', 'Українська')
  ];

  private dialogRef: MatDialogRef<ProfileModalComponent>;

  constructor(
    private profileForm: FormBuilder,
    private passwordForm: FormBuilder,
    dialogRef: MatDialogRef<ProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.dialogRef = dialogRef;
    this.country = data.country.id;
    this.countries = data.countries;
    this.localization = data.localization;
  }

  ngOnInit() {
    this.profileF = this.profileForm.group({
      localization: [this.localization, [Validators.required]],
      countryId: [this.country, [Validators.required]],
    });
    this.profileP = this.passwordForm.group({
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validator: this.validateRepeatPassword,
      });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
  }

  saveProfile() {
    this.dialogRef.close(this.profileF.value);
  }

  savePassword() {
    this.dialogRef.close(this.profileP.value);
  }

  close() {
    this.dialogRef.close();
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  validateRepeatPassword(group: FormGroup): ValidationErrors | null {
    const password = group.get('newPassword');
    const repeatPassword = group.get('repeatPassword');

    if (password.value !== repeatPassword.value) {
      repeatPassword.setErrors({validateRepeatPassword: true});
    }
    return null;
  }

}
