import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserData} from '../disease/disease.component';
import {Country} from '../../../models/country';
import {CountryService} from '../../../service/country.service';
import Swal from "sweetalert2";
import {CountryWithGraft} from '../../../models/country-with-graft';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countryList: CountryWithGraft[];

  displayedColumns: string[] = ['name', 'description', 'grafts', 'action'];
  dataSource: MatTableDataSource<CountryWithGraft>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private countryService: CountryService) {
    this.getCountryList();
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

}
