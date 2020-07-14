import {Component, ViewChild} from '@angular/core';
import {AnimalBreed} from '../../../models/animal-breed';
import {AnimalClass} from '../../../models/animal-class';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AnimalBreedService} from '../../../service/animal-breed.service';
import {AnimalClassService} from '../../../service/animal-class.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {AnimalBreedCreate} from '../../../models/animal-breed-create';
import {AnimalBreedModalComponent} from '../modal/animal-breed-modal/animal-breed-modal.component';

@Component({
  selector: 'app-animal-breed',
  templateUrl: './animal-breed.component.html',
  styleUrls: ['./animal-breed.component.css']
})
export class AnimalBreedComponent {

  breedsList: AnimalBreed[];
  classList: AnimalClass[];

  displayedColumns: string[] = ['name', 'animalsClass', 'action'];
  dataSource: MatTableDataSource<AnimalBreed>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private animalBreedService: AnimalBreedService,
              private animalClassService: AnimalClassService,
              private dialog: MatDialog) {
    this.getBreedList();
    this.getClassList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getBreedList() {
    this.animalBreedService.getAll()
      .subscribe(
        data => {
          this.breedsList = data;
          this.dataSource = new MatTableDataSource(this.breedsList);
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

  private getClassList() {
    this.animalClassService.getAll()
      .subscribe(
        data => {
          this.classList = data;
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

  openDialogEdit(animalBreed) {
    const dialogConfig = new MatDialogConfig();

    const animalClassesSelectedId = animalBreed.animalsClass.id;

    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '640px';

    dialogConfig.data = {
      id: animalBreed.id,
      name: animalBreed.name,
      animalClasses: this.classList,
      animalClassesSelectedId: animalClassesSelectedId
    };

    const dialogRef = this.dialog.open(AnimalBreedModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          const animalBreedCreate = data as AnimalBreedCreate;
          this.updateAnimalBreed(animalBreedCreate, data.id);
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

    dialogConfig.data = {
      animalClasses: this.classList
    };

    const dialogRef = this.dialog.open(AnimalBreedModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          const animalBreedCreate = data as AnimalBreedCreate;
          this.saveAnimalBreed(animalBreedCreate);
        }
      }
    );
  }

  private updateAnimalBreed(animalBreed: AnimalBreedCreate, id: number) {
    this.animalBreedService.update(animalBreed, id).subscribe(
      data => this.getBreedList(),
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cannot save data, try later',
          showConfirmButton: true,
          icon: 'error',
        });
      });
  }

  private saveAnimalBreed(animalBreed: AnimalBreedCreate) {
    this.animalBreedService.save(animalBreed).subscribe(
      data => this.getBreedList(),
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
    this.animalBreedService.dalete(id).subscribe(
      data => {
        this.getBreedList();
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
