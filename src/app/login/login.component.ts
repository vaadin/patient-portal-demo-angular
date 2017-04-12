import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.template.html',
  styleUrls: ['login.styles.css']
})
export class LoginComponent {

  errorMsg: string;
  loginForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(event: Event) {
    event.preventDefault();
    this.errorMsg = '';
    this.authService.login(this.loginForm.value)
      .subscribe(
      () => {
        this.router.navigate([this.authService.redirectUrl || '/']);
        this.authService.redirectUrl = null;
      },
      err => {
        this.errorMsg = err;
      }
      );
  }

}
