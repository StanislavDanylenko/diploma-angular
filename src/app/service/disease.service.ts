import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Disease} from '../models/disease';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  private url = `${environment.apiUrl}/disease`;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Disease[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Disease>(`${this.url}/${id}`);
  }

  save(disease: Disease) {
    return this.http.post<Disease>(`${this.url}`, disease);
  }

  update(disease: Disease, id: number) {
    return this.http.put<Disease>(`${this.url}/${id}`, disease);
  }

  dalete(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
