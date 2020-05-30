import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {Disease} from '../../../models/disease';
import {DiseaseService} from '../../../service/disease.service';
import {DiseaseModalComponent} from '../modal/disease-modal/disease-modal.component';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.css']
})
export class DiseaseComponent {

  diseaseList: Disease[];

  displayedColumns: string[] = ['name', 'action'];
  dataSource: MatTableDataSource<Disease>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private diseaseService: DiseaseService,
              private dialog: MatDialog) {
    this.getDiseaseList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getDiseaseList() {
    this.diseaseService.getAll()
      .subscribe(
        data => {
          this.diseaseList = data;
          this.dataSource = new MatTableDataSource(this.diseaseList);
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

  openDialogEdit(disease: Disease) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '640px';

    dialogConfig.data = {
      id: disease.id,
      name: disease.name,
    };

    const dialogRef = this.dialog.open(DiseaseModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          const diseaseFromModal = data as Disease;
          this.updateDisease(diseaseFromModal, diseaseFromModal.id);
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

    const dialogRef = this.dialog.open(DiseaseModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          const disease = data as Disease;
          this.saveDisease(disease);
        }
      }
    );
  }

  private updateDisease(disease: Disease, id: number) {
    this.diseaseService.update(disease, id).subscribe(
      data => this.getDiseaseList(),
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cannot save data, try later',
          showConfirmButton: true,
          icon: 'error',
        });
      });
  }

  private saveDisease(disease: Disease) {
    this.diseaseService.save(disease).subscribe(
      data => this.getDiseaseList(),
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cannot save data, try later',
          showConfirmButton: true,
          icon: 'error',
        });
      });
  }

  deleteDisease(id: number) {
    this.diseaseService.dalete(id).subscribe(
      data => {
        this.getDiseaseList();
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
