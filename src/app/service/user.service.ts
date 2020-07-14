import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FullUser} from '../models/full-user';
import {environment} from '../../environments/environment';
import {UserAdmin} from '../models/user-admin';
import {ProfileInfo} from '../models/profile-info';
import {Password} from '../models/password';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {
  }

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
    return this.http.put<User>(`${this.url}/${id}`, profileInfo);
  }

  updatePassword(password: Password) {
    return this.http.post<User>(`${this.url}/password`, password);
  }

  dalete(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
