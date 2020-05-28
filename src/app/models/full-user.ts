import {Country} from './country';
import {Role} from './role.enum';

export class FullUser {
  id: number;
  username: string;
  roles: string[];
  role: Role;
  localization: string;
  country: Country;
  token: string;
}
