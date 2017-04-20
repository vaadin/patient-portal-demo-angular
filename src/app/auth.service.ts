import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthInfo } from './auth-info';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  // Requested URL for login redirect
  redirectUrl: string;

  constructor(private http: Http) {
  }

  login(authInfo: AuthInfo): Observable<boolean> {
    return this.http.post(`${environment.API_URL}/login`, authInfo)
      .map(this.handleLogin)
      .catch(res => Observable.throw(res.json().message || 'Login failed'));
  }

  private handleLogin(res: Response) {
    const authorization = res.headers.get('Authorization');
    if (authorization && authorization.indexOf('Bearer ') === 0) {
      localStorage.setItem('token_id', authorization.substr(7));
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token_id');
  }

  loggedIn() {
    return !!localStorage.getItem('token_id');
  }

}
