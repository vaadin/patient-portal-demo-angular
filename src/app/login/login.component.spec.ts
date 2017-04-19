
import { DebugElement } from '@angular/core/core';
import { async } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


describe('LoginView tests', () => {

  let fixture: ComponentFixture<LoginComponent>;
  let authService;

  class Page {
    usernameInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    loginButton: HTMLElement;

    initComponents() {
      this.usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
      this.passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
      this.loginButton = fixture.debugElement.query(By.css('button')).nativeElement;
    }
  }

  this.fillLoginDetails = (username, password) => {
    this.page.usernameInput.value = username;
    this.page.usernameInput.dispatchEvent(new Event('input'));
    this.page.passwordInput.value = password;
    this.page.passwordInput.dispatchEvent(new Event('input'));
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: { navigate: () => { } } },
        { provide: AuthService, useValue: { login: () => { } } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    this.page = new Page();
    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    this.page.initComponents();
  });

  it('Submits correct values on login', () => {
    const spy = spyOn(authService, 'login').and.callFake((loginData: any) => {
      expect(loginData.username).toBe('user', 'Username incorrect');
      expect(loginData.password).toBe('pass', 'Password incorrect');
      return Observable.of(true);
    });
    this.fillLoginDetails('user', 'pass');
    this.page.loginButton.click();
    expect(spy.calls.count()).toBe(1, 'Auth service not called');
  });

  it('Navigates after a successful login', () => {
    const spy = spyOn(authService, 'login').and.returnValue(Observable.of(true));
    this.fillLoginDetails('user', 'pass');
    const router = fixture.debugElement.injector.get(Router);
    const navSpy = spyOn(router, 'navigate');
    this.page.loginButton.click();
    expect(navSpy.calls.count()).toBe(1, 'Did not navigate after login');
  });

  it('Shows an error message on failed login', fakeAsync(() => {
    const spy = spyOn(authService, 'login').and.returnValue(Observable.throw(new Error('errormessage')));
    this.page.loginButton.click();
    tick();
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('.alert.error'));
    expect(errorElement).not.toBeNull('Error label was not shown');
    expect(errorElement.nativeElement.textContent).toContain('errormessage', 'Error message was not shown');
  }));
});
