import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'login.template.html',
  styleUrls: ['login.styles.css']
})
export class LoginComponent {

  errorMsg: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  login(form: NgForm, event: Event) {
    event.preventDefault();
    this.errorMsg = '';
    this.authService.login(form.value)
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
