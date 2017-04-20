import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Patient } from '../entities';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { environment } from '../../../environments/environment';

@Injectable()
export class PatientsService {
  public patients: BehaviorSubject<GridDataResult> = new BehaviorSubject(null);
  public currentPatient: BehaviorSubject<Patient> = new BehaviorSubject(null);
  private sort: SortDescriptor[];
  private state: any;

  constructor(private http: Http) {
  }

  getPatients(state) {
    this.state = state;
    console.log(state);
    this.http
      .get(`${environment.API_URL}/patients?page=${state.skip / state.take}&limit=${state.take}`)
      .map(res => res.json())
      .catch(res => Observable.throw(res.json().message))
      .subscribe(res => {
        this.patients.next(<GridDataResult>{
          data: this.parseDates(res.content),
          total: res.totalElements
        });
        const patient = this.currentPatient.getValue();
        // refresh current patient
        if (patient) {
          this.setCurrentPatient(patient.id ? patient.id : null);
        }
      });
  }

  setCurrentPatient(id: number) {
    if (id) {
      this.patients
        .filter(patients => patients.data.length > 0)
        .map(patients => patients.data.find(p => p.id === id))
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
    return this.http.get(`${environment.API_URL}/doctors`)
      .map(res => res.json());
  }

  deleteCurrentPatient() {
    this.http
      .delete(`${environment.API_URL}/patients/${this.currentPatient.getValue().id}`)
      .catch(res => Observable.throw(res.json().message))
      .subscribe(() => {
        this.setCurrentPatient(null);
        this.getPatients(this.state);
      });
  }

  savePatient(patient: Patient) {
    let putOrPost = patient.id ? this.http.post(`${environment.API_URL}/patients/${patient.id}`, patient) :
      this.http.put(`${environment.API_URL}/patients`, patient);

    return putOrPost
      .catch(res => Observable.throw(res.json().message))
      .map(res => {
        this.getPatients(this.state);
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
    return patients.map(p => {
      p.lastEntry = new Date(p.lastEntry);
      p.birthDate = new Date(p.birthDate);
      return p;
    });
  }
}
