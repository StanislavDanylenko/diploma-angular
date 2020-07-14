import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AnimalBreed} from '../models/animal-breed';
import {AnimalBreedCreate} from '../models/animal-breed-create';

@Injectable({
  providedIn: 'root'
})
export class AnimalBreedService {

  private url = `${environment.apiUrl}/animalBreed`;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<AnimalBreed[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<AnimalBreed>(`${this.url}/${id}`);
  }

  save(animalBreed: AnimalBreedCreate) {
    return this.http.post<AnimalBreed>(`${this.url}`, animalBreed);
  }

  update(animalBreed: AnimalBreedCreate, id: number) {
    return this.http.put<AnimalBreed>(`${this.url}/${id}`, animalBreed);
  }

  dalete(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
