import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FullUser} from '../models/full-user';
import {environment} from '../../environments/environment';
import {Graft} from '../models/graft';
import {AnimalClass} from '../models/animal-class';

@Injectable({
  providedIn: 'root'
})
export class GraftService {
  private url = `${environment.apiUrl}/graft`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Graft[]>(`${this.url}`);
  }

  getById(id: number) {
    return this.http.get<Graft>(`${this.url}/${id}`);
  }

  save(animalClass: AnimalClass) {
    return this.http.post<AnimalClass>(`${this.url}`, animalClass);
  }

  update(animalClass: AnimalClass, id: number) {
    return this.http.put<AnimalClass>(`${this.url}/${id}`, animalClass);
  }

  dalete(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
