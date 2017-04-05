import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientsService } from '../../patients.service';
import { Patient, Doctor } from '../../../entities';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  patient: Patient;
  stop = false;
  doctors: Doctor[] = [];


  constructor(private patientsService: PatientsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: PlatformLocation) {
  }

  ngOnInit() {
    this.patientsService
      .currentPatient
      .takeWhile(() => !this.stop)
      .subscribe(patient => {
        this.patient = patient;
        this.fixDoctorInstance();
      });

    if (this.route.snapshot.url.find(url => url.path.includes('new'))) {
      this.patientsService.newPatient();
    }

    this.patientsService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
      this.fixDoctorInstance();
    });
  }

  /* Select binding uses instance equality so we need to make sure we are using one of the available options. */
  fixDoctorInstance() {
    if (this.patient && this.patient.doctor && this.doctors.length > 0) {
      this.patient.doctor = this.doctors.find(d => d.id === this.patient.doctor.id);
    }
  }

  save(form: NgForm) {
    const updated = Object.assign({}, this.patient, form.value);
    this.patientsService.savePatient(updated).subscribe(res => this.location.back());
  }


  deletePatient() {
    this.patientsService.deleteCurrentPatient();
    this.router.navigateByUrl('/patients');
  }

  ngOnDestroy(): void {
    this.stop = true;
  }

}
