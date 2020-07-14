import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AnimalBreedService} from '../../../service/animal-breed.service';
import {AnimalClassService} from '../../../service/animal-class.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UserService} from '../../../service/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {AnimalBreed} from '../../../models/animal-breed';
import Swal from "sweetalert2";
import {AnimalBreedModalComponent} from '../modal/animal-breed-modal/animal-breed-modal.component';
import {AnimalBreedCreate} from '../../../models/animal-breed-create';
import {UserAdmin} from '../../../models/user-admin';
import {UserModalComponent} from '../modal/user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  userList: User[];
  displayedColumns: string[] = ['username', 'action'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService,
              private dialog: MatDialog) {
    this.getUserList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getUserList() {
    this.userService.getAll()
      .subscribe(
        data => {
          this.userList = data;
          this.dataSource = new MatTableDataSource(this.userList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          Swal.fire({
            title: 'Error',
            text: 'Cannot get data, try later',
            showConfirmButton: true,
            icon: 'error',
          });
        });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '640px';

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(UserModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          const user = data as UserAdmin;
          this.saveUser(user);
        }
      }
    );
  }

  private saveUser(user: UserAdmin) {
    this.userService.save(user).subscribe(
      data => this.getUserList(),
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cannot save data, try later',
          showConfirmButton: true,
          icon: 'error',
        });
      });
  }

  deleteAnimalBreed(id: number) {
    this.userService.dalete(id).subscribe(
      data => {
        this.getUserList();
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cannot save data, try later',
          showConfirmButton: true,
          icon: 'error',
        });
      });
  }
}
