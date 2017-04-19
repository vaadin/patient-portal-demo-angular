import { browser, element, by } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/');
  }

  getUsernameInput() {
    return element(by.css('#username'));
  }

  getPasswordInput() {
    return element(by.css('#password'));
  }

  getLoginButton() {
    return element(by.css('button'));
  }

  getErrorLabel() {
    return element(by.css('.alert.error'));
  }

  getPageTitle() {
    return browser.getTitle();
  }
}
