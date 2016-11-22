import {Component, OnInit, OnDestroy} from "@angular/core";
import {JournalService} from "./journal.service";
import {Observable, Subscription} from "rxjs";
import {JournalEntry, Patient} from "../../../entities";
import {PatientsService} from "../../patients.service";
import {ResponsiveService} from "../../../responsive.service";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit, OnDestroy {

  entries: Observable<JournalEntry[]>;
  currentPatient: Patient;
  subs: Subscription[] = [];
  narrow: boolean;

  constructor(private service: JournalService,
              private patientsService: PatientsService,
              private  responsivService: ResponsiveService) {
    this.entries = this.service.entries;
  }

  ngOnInit() {
    this.subs.push(this.patientsService.currentPatient.subscribe(
      patient => this.currentPatient = patient
    ));

    this.subs.push(this.responsivService.resizeObservable.subscribe(narrow=> this.narrow = narrow));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
