import { browser, element, by } from 'protractor';

export class PatientsPage {
  getLogoutButton() {
    return element(by.css('.logout'));
  }

  isLoaded() {
    return this.getLogoutButton() !== null;
  }
}
