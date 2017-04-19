import { LoginPage } from './login.po';
import { PatientsPage } from './patients.po';

describe('Login page', function () {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('Should show error message on invalid logins', () => {
    page.navigateTo();
    page.getUsernameInput().sendKeys('user');
    page.getPasswordInput().sendKeys('wrong');
    page.getLoginButton().click();

    expect(page.getErrorLabel()).not.toBeNull();
  });

  it('Should navigate to patients view with correct login', () => {
    page.navigateTo();
    page.getUsernameInput().sendKeys('user');
    page.getPasswordInput().sendKeys('password');
    page.getLoginButton().click();

    expect(new PatientsPage().isLoaded()).toBeTruthy('Patients page not loaded');
  });
});
