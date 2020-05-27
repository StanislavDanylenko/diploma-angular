import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name = "Ivan";

  constructor(private authenticationService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    location.reload(true);
  }

}
