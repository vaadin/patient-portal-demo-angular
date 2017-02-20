import {Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Patient} from "../entities";
import {PatientsService} from "./patients.service";
import {Subscription, Observable, BehaviorSubject} from "rxjs";
import {SelectionEvent, GridDataResult, DataStateChangeEvent, GridComponent} from "@progress/kendo-angular-grid";
import {SortDescriptor} from '@progress/kendo-data-query';

import {ResponsiveService} from "../responsive.service";

@Component({
  templateUrl: 'patients.component.html',
  styleUrls: ['patients.component.css']
})
export class PatientsComponent implements OnInit, OnDestroy {

  protected patients: BehaviorSubject<GridDataResult>;
  protected currentPatient: Patient;
  protected sort: SortDescriptor[];
  protected subs: Subscription[] = [];

  protected pageSize: number = 50;
  protected skip: number = 0;

  narrow: boolean;
  @ViewChild(GridComponent) private grid: GridComponent;

  constructor(private patientsService: PatientsService,
              private route: ActivatedRoute,
              private router: Router,
              private responsive: ResponsiveService) {
  }

  ngOnInit(): void {
    this.patients = this.patientsService.patients;

    this.subs.push(this.patientsService.currentPatient.subscribe(
      patient => {
        this.currentPatient = patient;
      }
    ));

    this.patientsService.getPatients({skip: this.skip, take: this.pageSize});

    this.subs.push(this.responsive.resizeObservable.subscribe(
      narrow => this.narrow = narrow
    ));

    this.grid.dataStateChange
      .do(({ skip, take }: DataStateChangeEvent) => {
        this.skip = skip;
        this.pageSize = take;
      })
      .subscribe(x => this.patientsService.getPatients(x));
  }

  patientSelectionChanged(evt: SelectionEvent) {
    if (evt.selected) {
      this.router.navigate([this.patients.getValue().data[evt.index].id], {relativeTo: this.route});
    } else {
      this.router.navigate(['/patients']);
    }
  }


  detailsOpen() {
    return !!this.currentPatient;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
