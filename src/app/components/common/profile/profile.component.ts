import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {FullUser} from '../../../models/full-user';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CountryService} from '../../../service/country.service';
import {Country} from '../../../models/country';
import {ProfileModalComponent} from '../profile-modal/profile-modal.component';
import Swal from 'sweetalert2';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: FullUser;
  countryList: Country[];

  constructor(private authenticationService: AuthService,
              private countryService: CountryService,
              private userService: UserService,
              private dialog: MatDialog) {
    this.user = this.authenticationService.currentUserValue;
    this.getUserInfo();
    this.getCountryList();
  }

  private getCountryList() {
    this.countryService.getAll()
      .subscribe(
        data => {
          this.countryList = data;
          console.log(data);
        },
        error => {
          Swal.fire({
            title: 'Auto close alert!',
            text: 'I will close in 2 seconds.',
            timer: 2000
          });
        });
  }

  private getUserInfo() {
    this.userService.getById(this.user.id)
      .subscribe(
        data => {
          this.user.localization = data.localization;
          this.user.country = data.country;
          this.user.roles = data.roles;
          this.user.username = data.username;
          console.log(this.user);
        },
        error => {
          Swal.fire({
            title: 'Auto close alert!',
            text: 'I will close in 2 seconds.',
            timer: 2000
          });
        });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    location.reload(true);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '640px';

    dialogConfig.data = {
      country: this.user.country,
      countries: this.countryList,
      localization: this.user.localization,
    };

    const dialogRef = this.dialog.open(ProfileModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log('Dialog output:', data)
    );
  }

}
