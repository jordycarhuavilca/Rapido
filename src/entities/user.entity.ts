export class User {
  private name: string;
  private email: string;
  private password: string;
  private lastname: string;
  private gender: string;

  get nameData() {
    return this.name;
  }
  get emailData() {
    return this.email;
  }
  get passwordData() {
    return this.password;
  }
  get lastnameData() {
    return this.lastname;
  }
  get genderData() {
    return this.gender;
  }

  set nameData(name: string) {
    this.name = name;
  }
  set emailData(email: string) {
    this.email = email;
  }
  set passwordData(password: string) {
    this.password = password;
  }
  set lastnameData(lastname: string) {
    this.lastname = lastname;
  }
  set genderData(gender: string) {
    this.gender = gender;
  }
}