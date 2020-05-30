import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AnimalClass} from '../../../models/animal-class';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AnimalClassService} from '../../../service/animal-class.service';
import Swal from 'sweetalert2';
import {AnimalClassModalComponent} from '../modal/animal-class-modal/animal-class-modal.component';

@Component({
  selector: 'app-animal-class',
  templateUrl: './animal-class.component.html',
  styleUrls: ['./animal-class.component.css']
})
export class AnimalClassComponent {
  animalClassList: AnimalClass[];

  displayedColumns: string[] = ['name', 'action'];
  dataSource: MatTableDataSource<AnimalClass>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private animalClassService: AnimalClassService,
              private dialog: MatDialog) {
    this.getAnimalClassList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getAnimalClassList() {
    this.animalClassService.getAll()
      .subscribe(
        data => {
          this.animalClassList = data;
          this.dataSource = new MatTableDataSource(this.animalClassList);
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

  openDialogEdit(animalClass: AnimalClass) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '640px';

    dialogConfig.data = {
      id: animalClass.id,
      name: animalClass.name,
    };

    const dialogRef = this.dialog.open(AnimalClassModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          const animalClassFromModal = data as AnimalClass;
          this.updateAnimalClass(animalClassFromModal, animalClassFromModal.id);
        }
      }
    );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '640px';

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(AnimalClassModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          const animalClass = data as AnimalClass;
          this.saveAnimalClass(animalClass);
        }
      }
    );
  }

  private updateAnimalClass(animalClass: AnimalClass, id: number) {
    this.animalClassService.update(animalClass, id).subscribe(
      data => this.getAnimalClassList(),
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cannot save data, try later',
          showConfirmButton: true,
          icon: 'error',
        });
      });
  }

  private saveAnimalClass(animalClass: AnimalClass) {
    this.animalClassService.save(animalClass).subscribe(
      data => this.getAnimalClassList(),
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cannot save data, try later',
          showConfirmButton: true,
          icon: 'error',
        });
      });
  }

  deleteAnimalClass(id: number) {
    this.animalClassService.dalete(id).subscribe(
      data => {
        this.getAnimalClassList();
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
