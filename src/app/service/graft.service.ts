import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FullUser} from '../models/full-user';
import {environment} from '../../environments/environment';
import {Graft} from '../models/graft';

@Injectable({
  providedIn: 'root'
})
export class GraftService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Graft[]>(`${environment.apiUrl}/graft`);
  }

  getById(id: number) {
    return this.http.get<Graft>(`${environment.apiUrl}/graft/${id}`);
  }
}
