export class ProfileInfo {
  localization: string;
  countryId: string;

  constructor(localization: string, countryId: string) {
    this.localization = localization;
    this.countryId = countryId;
  }
}
