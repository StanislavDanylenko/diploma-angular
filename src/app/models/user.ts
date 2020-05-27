import {Country} from './country';

export class User {
  id: number;
  username: string;
  roles: string[];
  localization: string;
  country: Country;
}
