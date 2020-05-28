import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FullUser} from '../models/full-user';
import {environment} from '../../environments/environment';
import {Country} from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Country[]>(`${environment.apiUrl}/country`);
  }

  getById(id: number) {
    return this.http.get<Country[]>(`${environment.apiUrl}/country/${id}`);
  }
}
