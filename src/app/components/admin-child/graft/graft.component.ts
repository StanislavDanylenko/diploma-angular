import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {Graft} from '../../../models/graft';
import {GraftService} from '../../../service/graft.service';
import {GraftModalComponent} from '../modal/graft-modal/graft-modal.component';

@Component({
  selector: 'app-graft',
  templateUrl: './graft.component.html',
  styleUrls: ['./graft.component.css']
})
export class GraftComponent {
  graftList: Graft[];

  displayedColumns: string[] = ['name', 'frequency', 'action'];
  dataSource: MatTableDataSource<Graft>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private graftService: GraftService,
              private dialog: MatDialog) {
    this.getGraftList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getGraftList() {
    this.graftService.getAll()
      .subscribe(
        data => {
          this.graftList = data;
          this.dataSource = new MatTableDataSource(this.graftList);
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

  openDialogEdit(graft: Graft) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '640px';

    dialogConfig.data = {
      id: graft.id,
      name: graft.name,
      frequency: graft.frequency,
    };

    const dialogRef = this.dialog.open(GraftModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          const graftFromModal = data as Graft;
          this.updateGraft(graftFromModal, graftFromModal.id);
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

    const dialogRef = this.dialog.open(GraftModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          const graft = data as Graft;
          this.saveGraft(graft);
        }
      }
    );
  }

  private updateGraft(graft: Graft, id: number) {
    this.graftService.update(graft, id).subscribe(
      data => this.getGraftList(),
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cannot save data, try later',
          showConfirmButton: true,
          icon: 'error',
        });
      });
  }

  private saveGraft(graft: Graft) {
    this.graftService.save(graft).subscribe(
      data => this.getGraftList(),
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cannot save data, try later',
          showConfirmButton: true,
          icon: 'error',
        });
      });
  }

  deleteGraft(id: number) {
    this.graftService.dalete(id).subscribe(
      data => {
        this.getGraftList();
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
