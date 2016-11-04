import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Patient, Page} from "../entities";
import {PatientsService} from "./patients.service";
@Component({
  templateUrl: 'patients.component.html',
  styleUrls: ['patients.component.css']
})
export class PatientsComponent implements OnInit {

  protected patients: Patient[] = [];
  protected page: Page;

  constructor(private patientsService: PatientsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientsService.getPatients()
      .subscribe(
        patients => this.patients = patients,
        err => console.log(err)
      );
  }

  rowActivated(activatedDetails: Object) {
    console.log(activatedDetails);
  }

  showPatient(patient: Patient) {
    this.router.navigate([patient.medicalRecord], {relativeTo: this.route});
  }

  detailsOpen() {
    return this.router.url.indexOf('/patients/') >= 0;
  }
}
