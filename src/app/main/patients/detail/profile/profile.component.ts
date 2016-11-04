import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {PatientDetailsService} from "../patient-detail.service";
import {Patient} from "../../../entities";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  patient: Patient = new Patient();

  constructor(private service: PatientDetailsService) {
  }

  ngOnInit() {
    this.subscription = this.service.patientSubject.subscribe(
      patient => this.patient = patient);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
