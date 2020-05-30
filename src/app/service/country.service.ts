import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Country} from '../models/country';
import {CountryWithGraft} from '../models/country-with-graft';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url = `${environment.apiUrl}/country`;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Country[]>(this.url);
  }

  getFull() {
    return this.http.get<CountryWithGraft[]>(`${this.url}/full`);
  }

  getById(id: number) {
    return this.http.get<Country[]>(`${this.url}/${id}`);
  }

  save(country: Country) {
    return this.http.post<any>(`${this.url}`, country);
  }

  update(country: CountryWithGraft, id: number) {
    return this.http.put<any>(`${this.url}/${id}`, country);
  }

  dalete(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
