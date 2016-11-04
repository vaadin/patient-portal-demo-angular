import {Http} from "@angular/http";
import {Injectable, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Patient} from "../entities";
import {AppConfiguration} from "../../app-configuration.service";

@Injectable()
export class PatientsService implements OnInit {

  constructor(private http: Http,
              private config: AppConfiguration) {
  }

  ngOnInit() {
    console.log('Config: ' + this.config);
  }

  getPatients(): Observable<Patient[]> {
    return this.http
      .get(`${this.config.API_URL}/patients`)
      .map(res => {
        return (<Patient[]>res.json()).map(p=> {
          p.lastEntry = new Date(p.lastEntry);
          p.birthDate = new Date(p.birthDate);
          return p;
        });
      })
      .catch(res => Observable.throw(res.json().message));
  }

}
