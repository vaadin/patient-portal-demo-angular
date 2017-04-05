import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientsService } from '../../patients.service';
import { Patient } from '../../../entities';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  patient: Patient;
  sub: Subscription;

  constructor(private service: PatientsService) {
  }

  ngOnInit() {
    this.sub = this.service.currentPatient.subscribe(
      patient => this.patient = patient
    );

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
