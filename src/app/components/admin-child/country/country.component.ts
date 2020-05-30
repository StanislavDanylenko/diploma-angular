import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountryService} from '../../../service/country.service';
import Swal from 'sweetalert2';
import {CountryWithGraft} from '../../../models/country-with-graft';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CountryModalComponent} from '../modal/country-modal/country-modal.component';
import {GraftService} from '../../../service/graft.service';
import {Graft} from '../../../models/graft';
import {Country} from '../../../models/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countryList: CountryWithGraft[];
  graftList: Graft[];

  displayedColumns: string[] = ['name', 'description', 'grafts', 'action'];
  dataSource: MatTableDataSource<CountryWithGraft>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private countryService: CountryService,
              private graftService: GraftService,
              private dialog: MatDialog) {
    this.getCountryList();
    this.getGraftList();
  }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getCountryList() {
    this.countryService.getFull()
      .subscribe(
        data => {
          this.countryList = data;
          this.dataSource = new MatTableDataSource(this.countryList);
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

  private getGraftList() {
    this.graftService.getAll()
      .subscribe(
        data => {
          this.graftList = data;
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

  openDialogEdit(countryWithGraft) {
    const dialogConfig = new MatDialogConfig();

    const selectedGrafts = countryWithGraft.grafts.map(graft => graft.id);
    const country = countryWithGraft.country;

    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '640px';

    dialogConfig.data = {
      id: country.id,
      name: country.name,
      description: country.description,
      countryGraftsSelected: selectedGrafts,
      countryGrafts: this.graftList
    };

    const dialogRef = this.dialog.open(CountryModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          const countryWithGrafts = data as CountryWithGraft;
          countryWithGrafts.country = new Country(data.id, data.name, data.description);
          this.updateCountry(countryWithGrafts, data.id);
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
      countryGrafts: this.graftList
    };

    const dialogRef = this.dialog.open(CountryModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          const countryWithGrafts = data as CountryWithGraft;
          countryWithGrafts.country = new Country(data.id, data.name, data.description);
          this.saveCountry(countryWithGrafts);
        }
      }
    );
  }

  private updateCountry(countryWithGrafts: CountryWithGraft, id: number) {
    this.countryService.update(countryWithGrafts, id).subscribe(
      data => this.getCountryList(),
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cannot save data, try later',
          showConfirmButton: true,
          icon: 'error',
        });
      });
  }

  private saveCountry(countryWithGrafts: CountryWithGraft) {
    let country: Country;
    this.countryService.save(countryWithGrafts.country).subscribe(
      data => {
        country = data;
        countryWithGrafts.country = data;
        this.updateCountry(countryWithGrafts, country.id);
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

  deleteCountry(id: number) {
    this.countryService.dalete(id).subscribe(
      data => {
        this.getCountryList();
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
