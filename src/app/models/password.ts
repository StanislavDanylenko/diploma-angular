export class Password {
  id: number;
  oldPassword: string;
  newPassword: string;

  constructor(id: number, oldPassword: string, newPassword: string) {
    this.id = id;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
