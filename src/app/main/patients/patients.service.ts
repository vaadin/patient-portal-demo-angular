import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs";
import {Patient} from "../entities";
import {AppConfiguration} from "../../app-configuration.service";
import {SortDescriptor, orderBy} from "@progress/kendo-data-query";

@Injectable()
export class PatientsService {

  constructor(private http: Http,
              private config: AppConfiguration) {
  }

  public patients: BehaviorSubject<Patient[]> = new BehaviorSubject([]);
  public currentPatient: BehaviorSubject<Patient> = new BehaviorSubject(null);
  private sort: SortDescriptor[];


  getPatients() {
    this.http
      .get(`${this.config.API_URL}/patients`)
      .map(res => this.parseDates(res.json()))
      .map(this.sortPatients)
      .catch(res => Observable.throw(res.json().message))
      .subscribe(fetchedPatients => {
        this.patients.next(fetchedPatients);
        const patient = this.currentPatient.getValue();
        // refresh current patient
        if (patient) {
          this.setCurrentPatient(patient.id ? patient.id : null);
        }
      });
  }

  setSorting(sort: SortDescriptor[]) {
    this.sort = sort;
    this.patients.next(this.sortPatients(this.patients.getValue()));
  }

  setCurrentPatient(id: number) {
    if (id) {
      this.patients
        .filter(patients => patients.length > 0)
        .map(patients => patients.find(p => p.id === id))
        .take(1)
        .subscribe(p => this.currentPatient.next(p));
    } else {
      this.currentPatient.next(null);
    }
  }

  newPatient() {
    this.currentPatient.next(new Patient());
  }

  getDoctors() {
    return this.http.get(`${this.config.API_URL}/doctors`)
      .map(res => res.json());
  }

  deleteCurrentPatient() {
    this.http
      .delete(`${this.config.API_URL}/patients/${this.currentPatient.getValue().id}`)
      .catch(res => Observable.throw(res.json().message))
      .subscribe(() => {
        this.setCurrentPatient(null);
        this.getPatients();
      });
  }

  savePatient(patient: Patient) {
    let putOrPost = patient.id ? this.http.post(`${this.config.API_URL}/patients/${patient.id}`, patient) :
      this.http.put(`${this.config.API_URL}/patients`, patient);

    return putOrPost
      .catch(res => Observable.throw(res.json().message))
      .map(res => {
        this.getPatients();
        return res;
      });
  }

  private sortPatients(patients: Patient[]): Patient[] {
    if (!this.sort) {
      return patients;
    }
    return orderBy(patients, this.sort);
  }

  private parseDates(patients: Patient[]) {
    return patients.map(p=> {
      p.lastEntry = new Date(p.lastEntry);
      p.birthDate = new Date(p.birthDate);
      return p;
    });
  }
}
