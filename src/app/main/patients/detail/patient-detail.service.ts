import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {Subscription, BehaviorSubject} from "rxjs";
import {AppConfiguration} from "../../../app-configuration.service";
import {Patient} from "../../entities";

@Injectable()
export class PatientDetailsService implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;
  public patientSubject: BehaviorSubject<Patient> = new BehaviorSubject(new Patient());

  constructor(private http: Http,
              private config: AppConfiguration,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(
      params => this.fetchPatient(params['id'])
    );
  }


  fetchPatient(id: string) {
    this.http.get(`${this.config.API_URL}/patients/${id}`)
      .map(res => <Patient>res.json())
      .subscribe(patient => this.patientSubject.next(patient));
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
