import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AnimalClass} from '../models/animal-class';

@Injectable({
  providedIn: 'root'
})
export class AnimalClassService {
  private url = `${environment.apiUrl}/animalClass`;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<AnimalClass[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<AnimalClass>(`${this.url}/${id}`);
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
