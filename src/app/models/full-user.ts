import {Country} from './country';

export class FullUser {
  id: number;
  username: string;
  roles: string[];
  role: string;
  localization: string;
  country: Country;
  token: string;
}
