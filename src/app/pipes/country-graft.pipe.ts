import {Pipe, PipeTransform} from '@angular/core';
import {Graft} from '../models/graft';

@Pipe({
  name: 'countryGraft'
})
export class CountryGraftPipe implements PipeTransform {

  transform(value: Graft[], ...args: unknown[]): string {
    return value.map(graft => graft.name).join(',');
  }

}
