import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Patient} from "../entities";
import {PatientsService} from "./patients.service";
import {Subscription, Observable} from "rxjs";
import {SelectionEvent} from "@progress/kendo-angular-grid";
import {SortDescriptor} from '@progress/kendo-data-query';

import {ResponsiveService} from "../responsive.service";

@Component({
  templateUrl: 'patients.component.html',
  styleUrls: ['patients.component.css']
})
export class PatientsComponent implements OnInit, OnDestroy {

  protected patients: Patient[];
  protected currentPatient: Patient;
  protected sort: SortDescriptor[];
  protected subs: Subscription[] = [];
  narrow: boolean;

  constructor(private patientsService: PatientsService,
              private route: ActivatedRoute,
              private router: Router,
              private responsive: ResponsiveService) {
  }

  ngOnInit(): void {
    this.subs.push(this.patientsService.patients.subscribe(
      patients => this.patients = patients
    ));

    this.subs.push(this.patientsService.currentPatient.subscribe(
      patient => {
        this.currentPatient = patient;
      }
    ));

    this.patientsService.getPatients();

    this.subs.push(this.responsive.resizeObservable.subscribe(narrow => this.narrow = narrow));
  }

  private checkWidth() {
    return this.narrow = window.innerWidth < 600;
  }

  patientSelectionChanged(evt: SelectionEvent) {
    if (evt.selected) {
      this.router.navigate([this.patients[evt.index].id], {relativeTo: this.route});
    } else {
      this.router.navigate(['/patients']);
    }
  }

  sortChanged(sort: SortDescriptor[]) {
    this.patientsService.setSorting(sort);
  }

  detailsOpen() {
    return !!this.currentPatient;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
