import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientsService} from "../patients.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-patient',
  templateUrl: 'patient-detail.component.html',
  styleUrls: ['patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit, OnDestroy {

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private patientsService: PatientsService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        if (params.hasOwnProperty('id')) {
          console.log('Setting from details component');
          this.patientsService.setCurrentPatient(+params['id']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  routesActive(routes) {
    return routes.find(url => this.router.url.includes(url));
  }
}
