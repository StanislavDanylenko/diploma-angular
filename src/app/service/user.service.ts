import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FullUser} from '../models/full-user';
import {environment} from '../../environments/environment';
import {AnimalClass} from '../models/animal-class';
import {UserAdmin} from '../models/user-admin';
import {ProfileInfo} from '../models/profile-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<FullUser[]>(`${this.url}`);
  }

  getById(id: number) {
    return this.http.get<FullUser>(`${this.url}/${id}`);
  }

  save(user: UserAdmin) {
    return this.http.post<number>(`${this.url}`, user);
  }

  updateProfile(profileInfo: ProfileInfo, id: number) {
    return this.http.put<AnimalClass>(`${this.url}/${id}`, profileInfo);
  }

  updatePassword(profileInfo: ProfileInfo, id: number) {
    return this.http.put<AnimalClass>(`${this.url}/${id}`, profileInfo);
  }

  dalete(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
