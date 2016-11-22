import {PatientsService} from "../../patients.service";
import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {JournalEntry, Patient} from "../../../entities";
import {BehaviorSubject, Subscription, Observable} from "rxjs";
import {Http} from "@angular/http";
import {AppConfiguration} from "../../../../app-configuration.service";

@Injectable()
export class JournalService implements OnInit, OnDestroy {
  entries: BehaviorSubject<JournalEntry[]> = new BehaviorSubject([]);
  patientSubscription: Subscription;
  patient: Patient;

  constructor(private patientService: PatientsService,
              private http: Http,
              private config: AppConfiguration) {
    this.patientService.currentPatient.subscribe(
      currentPatient => {
        this.patient = currentPatient;
        if (currentPatient && currentPatient.id) {
          this.fetchJournalEntries();
        }
      }
    );
  }

  fetchJournalEntries() {
    if(!this.patient) return;

    this.http.get(`${this.config.API_URL}/patients/${this.patient.id}/journalentries`)
      .map(res => res.json())
      .subscribe(entries => {
        entries = entries.map(entry => {
          entry.date = new Date(entry.date);
          return entry;
        });
        entries.sort((a, b)=>b.date - a.date);
        this.entries.next(entries);
      });
  }

  addJournalEntry(entry: JournalEntry) {
    this.http.put(`${this.config.API_URL}/patients/${this.patient.id}/journalentries`, entry)
      .catch(err => Observable.throw(err.message))
      .subscribe(res => this.fetchJournalEntries());
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.patientSubscription.unsubscribe();
  }
}
