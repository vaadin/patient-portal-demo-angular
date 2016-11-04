import {Component} from "@angular/core";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})
export class MainComponent {
  constructor(
    public authService: AuthService,
    private router: Router) {
  }

  logout() {
    this.authService.logout();
  }

}
