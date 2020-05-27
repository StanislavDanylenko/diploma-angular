import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FullUser} from '../models/full-user';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<FullUser[]>(`${environment.apiUrl}/users`);
  }
}
